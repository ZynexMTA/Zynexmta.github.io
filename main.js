document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.querySelector(".search-box input");
    const serverList = document.querySelector(".servers-list");
    const serverCount = document.querySelector(".server-count span");

    if (!searchInput || !serverList) {
        return;
    }


    // =========================
    // EMPTY STATE
    // =========================

    const emptyState = document.createElement("div");

    emptyState.className = "empty-state";

    emptyState.innerHTML = `
        <div class="empty-icon">⌕</div>

        <h3>سروری پیدا نشد</h3>

        <p>
            نام سرور یا IP وارد شده با هیچ سروری مطابقت ندارد.
        </p>
    `;

    emptyState.style.display = "none";

    serverList.appendChild(emptyState);


    // =========================
    // SERVER SEARCH
    // =========================

    function searchServers() {

        const search = searchInput.value
            .trim()
            .toLowerCase();

        const cards = serverList.querySelectorAll(
            ".server-card"
        );

        let visibleServers = 0;


        cards.forEach(card => {

            const name =
                card.querySelector("h3")
                    ?.textContent
                    .toLowerCase() || "";

            const description =
                card.querySelector(".server-info p")
                    ?.textContent
                    .toLowerCase() || "";

            const ip =
                card.querySelector("code")
                    ?.textContent
                    .toLowerCase() || "";

            const tags =
                card.querySelector(".server-tags")
                    ?.textContent
                    .toLowerCase() || "";


            const searchableText =
                `${name} ${description} ${ip} ${tags}`;


            const found =
                searchableText.includes(search);


            if (found) {

                card.style.display = "flex";

                visibleServers++;

            } else {

                card.style.display = "none";

            }

        });


        // =========================
        // SERVER COUNT
        // =========================

        if (serverCount) {

            serverCount.textContent =
                visibleServers;

        }


        // =========================
        // EMPTY STATE
        // =========================

        if (visibleServers === 0) {

            emptyState.style.display = "flex";

        } else {

            emptyState.style.display = "none";

        }

    }


    // =========================
    // SEARCH EVENT
    // =========================

    searchInput.addEventListener(
        "input",
        searchServers
    );


    // =========================
    // ENTER KEY
    // =========================

    searchInput.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {

                searchServers();

            }

        }
    );


});