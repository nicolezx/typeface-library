window.onload = function () {
  const channelSlug = "typeface-library";
  // Fetch channel data
  fetch(`https://api.are.na/v2/channels/${channelSlug}`)
    .then((reponse) => {
      return reponse.json();
    })
    .then((channel) => {
      // console.log(channel);

      const titleEl = document.querySelector("h1");
      const title = channel.title;
      titleEl.innerHTML = title;

      const authorEl = document.querySelector("h2");
      const author = channel.user.full_name;
      authorEl.innerHTML = "Channel by " + author;

      channel.contents.forEach((blockParent) => {
        const contentsParentEl = document.querySelector("div.content");
        const channel = document.createElement("div");
        channel.classList.add("channel");
        contentsParentEl.appendChild(channel);

        if (blockParent.class === "Channel") {
          const blockParentInfoEl = document.createElement("div");
          blockParentInfoEl.classList.add("block-info");
          channel.appendChild(blockParentInfoEl);

          const blockParentTitle = blockParent.title;
          const blockParentTitleEl = document.createElement("h3");
          blockParentTitleEl.innerHTML = blockParentTitle;
          blockParentInfoEl.appendChild(blockParentTitleEl);
          const blockParentMeta = blockParent.metadata.description;
          const blockParentMetaEl = document.createElement("p");
          blockParentMetaEl.innerHTML = blockParentMeta;
          blockParentInfoEl.appendChild(blockParentMetaEl);

          const blockParentSlug = blockParent.slug;
          fetch(`https://api.are.na/v2/channels/${blockParentSlug}/contents`)
            .then((response) => {
              return response.json();
            })
            .then((blockChildren) => {
              console.log(blockChildren);

              blockChildren.contents.forEach((block) => {
                console.log(block);

                const blockThumb = block.image.original.url;
                const blockThumbEl = document.createElement("img");
                const blockThumbAlt = block.title;
                blockThumbEl.src = blockThumb;
                blockThumbEl.alt = blockThumbAlt;
                channel.appendChild(blockThumbEl);
              });
            });
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

// Fetch channel contents
// fetch(`https://api.are.na/v2/channels/${channelSlug}/contents`)
//   .then((reponse) => {
//     return reponse.json();
//   })
//   .then((contents) => {
//     // console.log(contents);

//     for (let i = 0; i < contents.length; i++) {
//       // Runs 5 times, with values of step 0 through 4.
//       // console.log(contents.class);
//     }

//     // if (contents.class === "Channel") {
//     // }
//   })
//   .catch((error) => {});

// const Arena = require("are.na");

// const arena = new Arena();

// arena
//   .channel("arena-influences")
//   .get()
//   .then((chan) => {
//     chan.contents.map((item) => {
//       console.log(item.title);
//     });
//   })
//   .catch((err) => console.log(err));

// // const Arena = require("are.na");
// // const arena = new Arena({
// //   accessToken: "Z-d03dcdyQ5QGeuL6AWyXHiIhD2hq7APCOtedS23Ai8",
// // });

// // arena
// //   .channel("xxx-hot-faces-in-your-area-xxx")
// //   .get()
// //   .then((chan) => {
// //     console.log(chan);
// //     // return chan.json();
// //   })
// //   .catch((error) => console.log(error));
