module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({ admin: "admin" });

  eleventyConfig.addCollection("blogPosts", (api) =>
    api.getFilteredByGlob("src/blog/*.md").sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addCollection("sermonNotes", (api) =>
    api.getFilteredByGlob("src/sermon-notes/*.md").sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addCollection("episodes", (api) =>
    api
      .getFilteredByGlob("src/podcast/*.md")
      .sort((a, b) => (b.data.episodeNumber || 0) - (a.data.episodeNumber || 0))
  );

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    const d = new Date(dateObj);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  });

  eleventyConfig.addFilter("limit", (arr, n) => (arr || []).slice(0, n));

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
