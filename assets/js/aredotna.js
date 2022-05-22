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

      // const authorEl = document.querySelector("h2");
      // const author = channel.user.full_name;
      // authorEl.innerHTML = "Channel by " + author;

      channel.contents.forEach((blockParent) => {
        // console.log(blockParent);
        const contentsParentEl = document.querySelector("div.content");
        const channel = document.createElement("div");
        channel.classList.add("channel");
        channel.id = blockParent.title;
        channel.dataset.toggled = false;
        contentsParentEl.appendChild(channel);

        if (blockParent.class === "Channel") {
          const blockParentInfoEl = document.createElement("div");
          blockParentInfoEl.classList.add("block-info");
          channel.appendChild(blockParentInfoEl);

          const blockParentInfoTop = document.createElement("div");
          blockParentInfoTop.classList.add("block-info-top");
          const blockParentInfoBottom = document.createElement("div");
          blockParentInfoBottom.classList.add("block-info-bottom");
          blockParentInfoEl.append(blockParentInfoTop, blockParentInfoBottom);

          const blockParentContentEl = document.createElement("div");
          blockParentContentEl.classList.add("block-content");
          channel.appendChild(blockParentContentEl);

          const blockParentTitle = blockParent.title;
          const blockParentTitleEl = document.createElement("h3");
          blockParentTitleEl.innerHTML = blockParentTitle;

          const blockParentMeta = blockParent.metadata.description;
          const blockParentMetaEl = document.createElement("div");
          blockParentMetaEl.classList.add("description");
          blockParentMetaEl.innerHTML = blockParentMeta;

          blockParentInfoTop.append(blockParentTitleEl, blockParentMetaEl);

          const blockParentInputEl = document.createElement("input");
          blockParentInputEl.type = "checkbox";
          blockParentInputEl.name = "expand-" + blockParentTitle;
          blockParentInputEl.id = "expand-" + blockParentTitle;

          const blockParentLabelEl = document.createElement("label");
          blockParentLabelEl.innerHTML = "[+] show more";
          blockParentLabelEl.setAttribute("for", "expand-" + blockParentTitle);

          blockParentInfoBottom.append(blockParentInputEl, blockParentLabelEl);

          blockParentInputEl.addEventListener("input", function () {
            const thisLabel = this.nextSibling;
            const thisChannel = this.closest("div.channel");
            // console.log(this.checked);
            if (this.checked) {
              thisChannel.dataset.toggled = "true";
              thisLabel.innerHTML = "[-] show less";
              thisChannel.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
              });
            } else {
              thisChannel.dataset.toggled = "false";
              thisLabel.innerHTML = "[+] show more";
            }
          });

          const blockParentSlug = blockParent.slug;
          fetch(`https://api.are.na/v2/channels/${blockParentSlug}/contents`)
            .then((response) => {
              return response.json();
            })
            .then((blockChildren) => {
              blockChildren.contents.forEach((block) => {
                console.log(block);

                const blockThumb = block.image.display.url;
                const blockThumbEl = document.createElement("img");
                const blockThumbAlt = block.title;
                blockThumbEl.src = blockThumb;
                blockThumbEl.alt = blockThumbAlt;
                blockParentContentEl.appendChild(blockThumbEl);
              });
            });
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
