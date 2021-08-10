module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "FAQ Hub",
  },
  plugins: [
    {
        resolve: 'gatsby-plugin-web-font-loader',
        options: {
            google: {
                families: ['Montserrat']
            }
        }
    },
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
  ],
};
