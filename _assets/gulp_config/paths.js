var paths = {};

// Directory locations.
paths.assetsDir        = '_assets/';      // The files Gulp will handle.
paths.jekyllDir        = '';              // The files Jekyll will handle.
paths.jekyllAssetsDir  = 'assets/';       // The asset files Jekyll will handle.
paths.siteDir          = '_site/';        // The resulting static site.
paths.siteAssetsDir    = '_site/assets/'; // The resulting static site's assets.

// Folder naming conventions.
paths.postFolderName   = '_posts';
paths.fontFolderName   = 'fonts';
paths.imageFolderName  = 'img';
paths.scriptFolderName = 'js';
paths.stylesFolderName = 'sass';
paths.videoFolderName  = 'video';
paths.pdfFolderName  = 'pdf';

// Asset files locations.
paths.sassFiles   = paths.assetsDir + paths.stylesFolderName;
paths.jsFiles     = paths.assetsDir + paths.scriptFolderName;
paths.imageFiles  = paths.assetsDir + paths.imageFolderName;
paths.fontFiles   = paths.assetsDir + paths.fontFolderName;
paths.videoFiles  = paths.assetsDir + paths.videoFolderName;
paths.pdfFiles    = paths.assetsDir + paths.pdfFolderName;

// Jekyll files locations.
paths.jekyllPostFiles  = paths.jekyllDir       + paths.postFolderName;
paths.jekyllCssFiles   = paths.jekyllAssetsDir + paths.stylesFolderName;
paths.jekyllJsFiles    = paths.jekyllAssetsDir + paths.scriptFolderName;
paths.jekyllImageFiles = paths.jekyllAssetsDir + paths.imageFolderName;
paths.jekyllFontFiles  = paths.jekyllAssetsDir + paths.fontFolderName;
paths.jekyllVideoFiles = paths.jekyllAssetsDir + paths.videoFolderName;
paths.jekyllPdfFiles   = paths.jekyllAssetsDir + paths.pdfFolderName;

// Site files locations.
paths.siteCssFiles   = paths.siteAssetsDir + paths.stylesFolderName;
paths.siteJsFiles    = paths.siteAssetsDir + paths.scriptFolderName;
paths.siteImageFiles = paths.siteAssetsDir + paths.imageFolderName;
paths.siteFontFiles  = paths.siteAssetsDir + paths.fontFolderName;
paths.siteVideoFiles = paths.siteAssetsDir + paths.videoFolderName;
paths.sitePdfFiles   = paths.siteAssetsDir + paths.pdfFolderName;

// Glob patterns by file type.
paths.sassPattern     = '/**/*.scss';
paths.jsPattern       = '/**/*.js';
paths.imagePattern    = '/**/*.+(jpg|JPG|jpeg|JPEG|png|PNG|svg|SVG|gif|GIF|webp|WEBP|tif|TIF|ico)';
paths.markdownPattern = '/**/*.+(md|MD|markdown|MARKDOWN)';
paths.htmlPattern     = '/**/*.html';
paths.videoPattern    = '/**/*.+(mp4|ogg|webm|wav|flac|mp3)';
paths.pdfPattern      = '/**/*.pdf';

// Asset files globs
paths.sassFilesGlob  = paths.sassFiles  + paths.sassPattern;
paths.jsFilesGlob    = paths.jsFiles    + paths.jsPattern;
paths.imageFilesGlob = paths.imageFiles + paths.imagePattern;
paths.videoFilesGlob = paths.videoFiles + paths.videoPattern;
paths.pdfFilesGlob   = paths.pdfFiles   + paths.pdfPattern;

// Jekyll files globs
paths.jekyllPostFilesGlob  = paths.jekyllPostFiles  + paths.markdownPattern;
paths.jekyllHtmlFilesGlob  = paths.jekyllDir        + paths.htmlPattern;
paths.jekyllXmlFilesGlob   = paths.jekyllDir        + paths.xmlPattern;
paths.jekyllImageFilesGlob = paths.jekyllImageFiles + paths.imagePattern;
paths.jekyllVideoFilesGlob = paths.jekyllVideoFiles + paths.videoPattern;
paths.jekyllPdfFilesGlob   = paths.jekyllPdfFiles   + paths.pdfPattern;

// Site files globs
paths.siteHtmlFilesGlob = paths.siteDir + paths.htmlPattern;

// HTML pages to run through the accessibility test.
paths.htmlTestFiles = [
  '_site/**/*.html'
];

module.exports = paths;