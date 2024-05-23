class WMSummaryBlock {
  static defaultSettings = {
    filterPlacement: "left",
    titleTag: "h2",
    showMoreText: "Show More",
    initialItemsToDisplay: 20,
    showMoreItems: 8,
    sessionStorage: true,
    batchSize: 40,
    icons: {
      downArrow: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </svg>`,
      expandedGrid: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
      </svg>`,
      filter: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
      </svg>`,
      loading: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>`,
      close: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>`,
      plus: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>`,
      reset: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
      </svg>`,
    },
  };
  constructor(el) {
    this.el = el;
    this.settings = {};
    this.Supabase = window.wmToolkit.Supabase;
    this.Squarespace = window.wmToolkit.Squarespace;
    this.Utilities = window.wmToolkit.Utilities;
    this.url = this.el.dataset.collections;
    this.data = []; // Data recieved from Supabase
    this.squarespaceData = []; // Data recieved from Squarespace via ?format=json
    this.refreshButton = undefined;
    this.websiteId = Static.SQUARESPACE_CONTEXT.website.id;
    this.imageCache = {};
    this.urlParams = this.getUrlParams();
    this.filters = {
      categories: {
        multiSelect: this.urlParams.multiSelect || [],
        singleSelect: this.urlParams.singleSelect || "",
      },
      tags: {
        multiSelect: [],
        singleSelect: "",
      },
    };
    this.filteredResults = [];
    this.filteredItemsCursor = 0;
    this.initialAmount = 20;
    this.showMoreAmount = 8;
    this.sessionKey = `data-${this.websiteId}-${this.el.dataset.collections}`;

    this.init();
  }
  async init() {
    this.Utilities.emitEvent("wmSummaryBlock:beforeStart", {el: this.el});
    this._combineSettings();
    this.buildBlock();
    this.data = await this.getItems();
    this.Utilities.emitEvent("wmSummaryBlock:afterFetch", {el: this.el});
    this.clearList();
    this.filteredResults = this.data;
    this.addItems(this.settings.initialItemsToDisplay);
    this.Utilities.emitEvent("wmSummaryBlock:afterBuild", {el: this.el});
    this.bindEventListeners();
    if (window.top !== window.self) {
      this.addRefreshButton();
    }
    this.Utilities.emitEvent("wmSummaryBlock:afterInit", {el: this.el});
  }
  bindEventListeners() {
    this.addShowMoreButtonClickEvent();
    //this.addFilterButtonClickEvent();
    this.addPopoverEventListeners();
    this.addToggleEventListener();
    this.addResetEventListener();
    this.addSingleSelectFilterButtonClickEvent();
    this.addMultiSelectFilterButtonClickEvent();
    this.addSearchInputEvent();
    this.addSortOptionsToggleEventListener();
    this.addfilterPanelOpenClickEvent();
    this.addfilterPanelCloseClickEvent();
  }
  getUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const params = {};
    urlParams.forEach((value, key) => {
      console.log(key)
      if (key === 'multiSelect') {
        params[key] = value.split(',');
      } else if (key === 'singleSelect') {
        params[key] = value;
      }
      
    });
    return params;
  }
  setUrlParams(filters) {
    const urlParams = new URLSearchParams();
    for (const key in filters) {
      if (filters.hasOwnProperty(key)) {
        const value = filters[key];
        if (Array.isArray(value)) {
          if (value.length) urlParams.set(key, value.join(',')); // Serialize array as comma-separated list
        } else {
          console.log(value)
          if (value) urlParams.set(key, value);
        }
      }
    }
    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  }
  resetUrlParams() {
    const newUrl = window.location.pathname;
    window.history.pushState({ path: newUrl }, '', newUrl);
  }
  buildBlock() {
    const filtersObj = this.getFiltersObject();
    const primaryFilters = filtersObj.filter(item => item.title === "Primary");
    const filters = filtersObj.filter(item => item.title !== "Primary");
    function sanitizeString(str) {
      return str
        .trim()
        .toLowerCase() // Convert to lowercase
        .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphens
        .replace(/^-+|-+$/g, "") // Remove leading and trailing hyphens
        .replace(/^-/, ""); // Ensure it does not start with a hyphen
    }
    function addDataAttributes(dataset) {
      return Object.entries(dataset)
        .map(([key, value]) => ` data-${key}="${value}"`)
        .join("");
    }
    const details = filter => {
      return `<details>
          <summary>
            <h4 class="title">${filter.title}</h4>
            <span class="show-filters-icon">${this.settings.icons.plus}</span>
          </summary>
          <ul>
            ${filter.items
              .map(
                item => `<li${
                  item.el.classList.length
                    ? ` class="${item.el.classList.join(" ")}"`
                    : ""
                }>
<input type="checkbox" id="${sanitizeString(filter.title)}-${sanitizeString(
                  item.title
                )}"${addDataAttributes(
                  item.el.dataset
                )} /><label for="${sanitizeString(
                  filter.title
                )}-${sanitizeString(item.title)}">${
                  item.el.innerHTML
                }</label></li>`
              )
              .join("")}
          </ul>
        </details>`;
    };
    const popover = filter => {
      return `<div class="popover">
        <div class="popover-title"><button>${
          filter.title
        }<span class="filter-count"></span>${
        this.settings.icons.downArrow
      }</button></div>
        <div class="popover-content">
          <ul class="popover-content-inner-wrapper">
            ${filter.items
              .map(
                item => `<li${
                  item.el.classList.length
                    ? ` class="${item.el.classList.join(" ")}"`
                    : ""
                }>
  <input type="checkbox" id="${sanitizeString(filter.title)}-${sanitizeString(
                  item.title
                )}"${addDataAttributes(
                  item.el.dataset
                )} /><label for="${sanitizeString(
                  filter.title
                )}-${sanitizeString(item.title)}">${
                  item.el.innerHTML
                }</label></li>`
              )
              .join("")}
          </ul>
        </div>
      </div>`;
    };
    const toggle = () => {
      return `<div class="toggle-switch-container">
        <p>Browse By:</p>
        <div class="toggle-switch filter-view" data-state="inspo">
          <span>Inspo</span>
          <button>
            <span class="background"></span>
            <span class="dot"></span>
          </button>
          <span>Types</span>
        </div>
      </div>`;
    };
    const filterHeader = () => {};
    const filterTitle = () => {
      return `<div class="summary-filter-title">${
        this.settings.title
          ? `<h2>${this.settings.title}<span class="active-filter-text"></span></h2>`
          : ``
      }</div>`;
    };
    const showMobileFilterButton = () => {
      return `<div class="filter-toggle-container">
      <button class="filter-panel-open">filter${this.settings.icons.filter}</button>
    </div>`;
    };
    const inspoFilters = () => {
      return `<ul class="primary-filter-group">
        ${primaryFilters[0].items
          .map(
            item => `<li><a${
              item.el.classList.length
                ? ` class="${item.el.classList.join(" ")}"`
                : ""
            }
        ${addDataAttributes(item.el.dataset)} href="#${sanitizeString(
              item.title
            )}">${item.el.innerHTML}</a></li>`
          )
          .join("")}
      </ul>`;
    };
    const typesFilter = () => {
      return `<div class="filter-groups">${
        filters.length
          ? filters
              .map(
                filter =>
                  `<div class="filter-group multiselect">
                    ${popover(filter)}
                  </div>`
              )
              .join("")
          : `null`
      }
        <div class="reset-toggle">
          <button>clear</button>
        </div>
      </div>`;
    };
    this.el.innerHTML = `<div class="summary-header">
      ${toggle()} 
      
    </div>
    <div class="summary-filter">
      <div class="mobile-header">
        <h4 class="filter-title">Filter</h4> 
        <button class="filter-panel-close">${this.settings.icons.close}</button>
      </div>
      <div class="mobile-filter-toggle">${toggle()}</div>
      ${inspoFilters()}
      ${typesFilter()}
    </div>
      <div class="items-wrapper">
        ${
          this.settings.search
            ? `<div class="search">
              <input type="text" placeholder="Search"/>
              ${showMobileFilterButton()}
            </div>`
            : ``
        }
        <div class="items-list"><div class="loading">${
          this.settings.icons.loading
        }</div></div>
        <div class="show-more">
          <button>Show More</button>
        </div>
      </div>`;

    this.itemsWrapper = this.el.querySelector(".items-wrapper");
    this.itemsList = this.el.querySelector(".items-list");
    this.filter = this.el.querySelector(".summary-filter");
    this.activeFilterText = this.el.querySelector(".active-filter-text");
    this.filterOpenButton = this.el.querySelector("button.filter-panel-open");
    this.filterCloseButton = this.el.querySelector("button.filter-panel-close");
    this.showMore = this.el.querySelector(".show-more");
    this.showMoreButton = this.el.querySelector(".show-more button");
    this.searchInput = this.el.querySelector(".search input");
    this.gridViewButton = this.el.querySelector(".grid-view button");
    this.sortOptionsToggle = this.el.querySelector(".summary-sort > button");
    this.sortOptions = this.el.querySelectorAll(".sort-options button");
    this.filterButtons = this.el.querySelectorAll("[data-filter]");
    this.multiSelectFilters = this.el.querySelectorAll(
      "input[type='checkbox'][data-filter]"
    );
    this.singleSelectFilters = this.el.querySelectorAll("a[data-filter]");
    this.el.classList.add("wm-summary-block");
    this.el.dataset.filterPlacement = this.settings.filterPlacement;
  }
  getFiltersObject() {
    this.filterButtons = this.el.querySelectorAll("[data-filter]");
    const buildFiltersObject = () => {
      const filters = [];

      this.filterButtons.forEach(button => {
        const title = button.textContent.trim(); // Get button text content and trim whitespace
        const selector = button.getAttribute("data-filter"); // Get the data-filter attribute
        const groupTitle = button.getAttribute("data-group"); // Get the data-group attribute

        // Check if the group already exists in the filters array
        let group = filters.find(f => f.title === groupTitle);
        if (!group) {
          // If the group does not exist, create it and add to filters
          group = {
            title: groupTitle,
            items: [],
          };
          filters.push(group);
        }

        // Add the item to the group
        group.items.push({
          title: title,
          selector: selector,
          el: button,
        });
        button.remove();
      });

      return filters;
    };
    this.filtersObj = buildFiltersObject();
    return this.filtersObj;
  }
  buildItem(item) {
    const stringify = str => str.replace(/\s+/g, "-").toLowerCase();
    const itemDiv = document.createElement("div");
    itemDiv.className = `wm-summary-item`;
    item.categories
      ? (itemDiv.dataset.categories = item.categories.map(stringify).join(" "))
      : null;
    item.tags
      ? (itemDiv.dataset.tags = item.tags.map(stringify).join(" "))
      : null;

    const mediaDiv = document.createElement("div");
    mediaDiv.className = "media";

    const mediaLink = document.createElement("a");
    mediaLink.className = "media-link";
    mediaLink.href = item.url;
    mediaDiv.appendChild(mediaLink);

    let img = this.imageCache[item.asset_url];
    if (!img) {
      img = document.createElement("img");
      img.src = item.asset_url;
      this.imageCache[item.asset_url] = img; // Cache the image element
    }
    mediaLink.appendChild(img);

    const contentDiv = document.createElement("div");
    contentDiv.className = "content";

    const title = document.createElement(this.settings.titleTag);
    title.className = "title";
    contentDiv.appendChild(title);

    const titleLink = document.createElement("a");
    titleLink.className = "title-link";
    titleLink.textContent = item.title;
    titleLink.href = item.url;
    title.appendChild(titleLink);

    const excerpt = document.createElement("div");
    excerpt.className = "excerpt";
    excerpt.innerHTML = item.excerpt;
    contentDiv.appendChild(excerpt);

    itemDiv.appendChild(mediaDiv);
    itemDiv.appendChild(contentDiv);
    return itemDiv;
  }
  addItems(num) {
    const endIndex = this.filteredItemsCursor + num;
    const batch = this.filteredResults.slice(
      this.filteredItemsCursor,
      endIndex
    );
    const fragment = document.createDocumentFragment();

    batch.forEach(item => {
      const itemDiv = this.buildItem(item);
      fragment.appendChild(itemDiv);
    });

    this.filteredItemsCursor = endIndex;
    this.itemsList.appendChild(fragment);

    if (this.filteredResults.length <= this.filteredItemsCursor) {
      this.showMore.style.display = "none";
    } else {
      this.showMore.style.display = "block";
    }
  }
  clearList() {
    this.itemsList.innerHTML = "";
    this.filteredItemsCursor = 0;
    this.activeFilterText ? (this.activeFilterText.innerHTML = ``) : null;
  }
  openFilter() {
    this.el.classList.add("filter-open");
  }
  closeFilter() {
    this.el.classList.remove("filter-open");
  }
  filterResultsBySearch(searchTerm) {
    this.clearList();
    searchTerm = searchTerm.toLowerCase();
    this.filteredResults = this.data.filter(item => {
      return item.searchableString.toLowerCase().includes(searchTerm);
    });
    this.addItems(this.settings.initialItemsToDisplay);
  }
  filterResultsByCategory(category) {
    this.filteredResults = this.data.filter(
      item => item.categories && item.categories.includes(category)
    );

    this.activeFilterText
      ? (this.activeFilterText.innerHTML = `: ${category}`)
      : null;
  }
  filterResults() {
    const {multiSelect, singleSelect} = this.filters.categories;

    // If no filters are selected, return all items
    if (!multiSelect.length && !singleSelect) {
      return this.data;
    }

    const filteredItems = this.data.filter(item => {
      if (!item.categories) {
        return false;
      }

      if (singleSelect) {
        // If singleSelect is present, item must match singleSelect
        const matchesSingleSelect = item.categories.includes(singleSelect);
        if (!matchesSingleSelect) {
          return false;
        }
      }

      if (multiSelect.length) {
        // If multiSelect is present, item must match at least one category in multiSelect
        const matchesMultiSelect = multiSelect.some(category =>
          item.categories.includes(category)
        );
        return matchesMultiSelect;
      }

      // If only singleSelect is present, and it matches, include the item
      return true;
    });

    // Set URL Params
    this.setUrlParams(this.filters.categories); // Use explicit method

    return filteredItems;
  }
  reset() {
    const defaultFilters = {
      categories: {
        multiSelect: [],
        singleSelect: "",
      },
      tags: {
        multiSelect: [],
        singleSelect: "",
      },
    };
    this.resetUrlParams()
    if (JSON.stringify(this.filters) === JSON.stringify(defaultFilters)) return;

    this.clearList();
    this.filters = defaultFilters;
    this.singleSelectFilters.forEach(button =>
      button.classList.remove("active")
    );
    this.multiSelectFilters.forEach(input => {
      input.checked = false;
      input.classList.remove("active");
    });
    this.el
      .querySelectorAll(".popover .filter-count")
      .forEach(el => (el.style.display = "none"));
    this.filteredResults = this.data;
    this.addItems(this.settings.initialItemsToDisplay);
  }
  async getItems() {
    const cachedData = sessionStorage.getItem(this.sessionKey);
    if (cachedData) {
      const dataFromCache = JSON.parse(cachedData);
      this.refreshFromSupabase();
      return dataFromCache;
    }
    const fromSupabase = await this.Supabase.getItemsByCollectionUrl(this.url);
    if (this.settings.sessionStorage)
      sessionStorage.setItem(this.sessionKey, JSON.stringify(fromSupabase));
    return fromSupabase;
  }
  async syncCollectionAndDatabase() {
    this.refreshButton.innerText = "Syncing";
    // Get Database Items
    const currentData = await this.Supabase.getItemsByCollectionUrl(this.url);

    // Get Live Items from Squarespace
    const {
      items: collectionData,
      collection,
      website,
    } = await this.Squarespace.getItemsFromCollection(this.url);

    // Diff the database & Squarespace
    const {added, changed, removed} = this.diffSquarespaceAndDatabase(
      currentData,
      collectionData
    );

    // Remove Deleted Pages
    if (removed.length) {
      const deletePromises = removed.map(id => this.Supabase.deleteItem(id));
      try {
        await Promise.all(deletePromises);
      } catch (error) {
        console.error("Failed to delete one or more items:", error);
      }
    }

    // Save All other data to database
    this.refreshButton.innerText = "Updating Database";
    const batchSize = this.settings.batchSize;
    for (let i = 0; i < collectionData.length; i += batchSize) {
      const batch = collectionData.slice(i, i + batchSize);
      const res = await this.Supabase.saveItems(batch, this.url);
      console.log(res);
    }

    // Reset plugin data
    this.data = await this.Supabase.getItemsByCollectionUrl(this.url);
    if (this.settings.sessionStorage)
      sessionStorage.setItem(this.sessionKey, JSON.stringify(this.data));

    this.reset();
    this.refreshButton.innerText = "Done!";
    window.setTimeout(() => {
      this.refreshButton.innerText = "Refresh Collection";
    }, 1000);
  }
  async refreshFromSupabase() {
    const fromSupabase = await this.Supabase.getItemsByCollectionUrl(this.url);
    if (this.settings.sessionStorage)
      sessionStorage.setItem(this.sessionKey, JSON.stringify(fromSupabase));
    const isDifferent = this._diffArrays(fromSupabase, this.data);
    if (isDifferent) {
      this.data = fromSupabase;
      this.clearList();
      this.addItems(this.settings.initialItemsToDisplay);
    }
  }
  diffSquarespaceAndDatabase(supabaseData, ssData) {
    const keyMap = {
      assetUrl: "asset_url",
      title: "title",
      excerpt: "excerpt",
      categories: "categories",
      tags: "tags",
    };
    const isEqual = (obj1, obj2) => {
      return JSON.stringify(obj1) === JSON.stringify(obj2);
    };
    const mapArrayById = (array, idKey) => {
      return array.reduce((acc, item) => {
        acc[item[idKey]] = item;
        return acc;
      }, {});
    };
    const normalizeKeys = obj => {
      const normalized = {};
      Object.keys(keyMap).forEach(targetKey => {
        const sourceKey = keyMap[targetKey];
        if (obj.hasOwnProperty(sourceKey)) {
          normalized[targetKey] = obj[sourceKey];
        }
        if (obj.hasOwnProperty(targetKey)) {
          normalized[targetKey] = obj[targetKey];
        }
      });
      return normalized;
    };

    const supabaseMap = mapArrayById(supabaseData, "page_id");
    const squarespaceMap = mapArrayById(ssData, "id");
    const added = [];
    const removed = [];
    const changed = [];

    Object.keys(supabaseMap).forEach(key => {
      supabaseMap[key] = normalizeKeys(supabaseMap[key]);
    });

    Object.keys(squarespaceMap).forEach(key => {
      squarespaceMap[key] = normalizeKeys(squarespaceMap[key]);
    });

    // Determine added, changed, and removed items
    Object.keys(squarespaceMap).forEach(key => {
      if (!supabaseMap[key]) {
        added.push(key);
      } else if (!isEqual(supabaseMap[key], squarespaceMap[key])) {
        changed.push(key);
      }
    });

    Object.keys(supabaseMap).forEach(key => {
      if (!squarespaceMap[key]) {
        removed.push(key);
      }
    });

    console.log({added, removed, changed});
    return {added, removed, changed};
  }
  addRefreshButton() {
    this.refreshButton = document.querySelector("button");
    this.refreshButton.classList.add("refresh-collection");
    this.refreshButton.innerText = "Refresh Collection";
    this.el.appendChild(this.refreshButton);
    this.refreshButton.addEventListener("click", () => {
      this.syncCollectionAndDatabase();
    });
  }
  addToggleEventListener() {
    const filterToggles = this.el.querySelectorAll(
      ".toggle-switch.filter-view"
    );
    const setToggle = () => {
      filterToggles.forEach(toggle => {
        if (toggle.dataset.state === "inspo") {
          toggle.dataset.state = "types";
          this.el.dataset.filterView = "types";
        } else {
          toggle.dataset.state = "inspo";
          this.el.dataset.filterView = "inspo";
        }
      });
    };

    const initalView = this.filters.categories.multiSelect.length ? 'types' : 'inspo';
    this.el.dataset.filterView = initalView;

    filterToggles.forEach(toggle => {
      toggle.dataset.state = initalView;
      toggle.addEventListener("click", () => {
        this.reset();
        setToggle();
      });
    });
  }
  addShowMoreButtonClickEvent() {
    const handleClick = () => {
      this.addItems(this.settings.showMoreItems);
    };
    this.showMoreButton?.addEventListener("click", handleClick);
  }
  addPopoverEventListeners() {
    this.popovers = this.el.querySelectorAll(".popover");
    this.popoverButtons = this.el.querySelectorAll(".popover-title button");

    const handleOpen = e => {
      const popover = e.target.closest(".popover");
      const isOpen = popover.matches(".open");
      this.popovers.forEach(popover => popover.classList.remove("open"));
      if (!isOpen) popover?.classList.add("open");
    };
    const setCount = e => {
      const popover = e.target.closest(".popover");
      const count = popover.querySelector(".filter-count");
      const active = popover.querySelectorAll(".active");
      count.innerText = active.length;
      active.length
        ? (count.style.display = "inline-grid")
        : (count.style.display = "none");
    };

    this.popovers.forEach(popover =>
      popover.addEventListener("click", setCount)
    );

    this.popoverButtons.forEach(button =>
      button.addEventListener("click", handleOpen)
    );
    document.addEventListener("click", e => {
      if (e.target.closest(".popover")) return;
      this.popovers.forEach(popover => popover.classList.remove("open"));
    });
  }
  addResetEventListener() {
    const resetButton = this.el.querySelector(".reset-toggle button");
    const handleReset = () => {};
    resetButton.addEventListener("click", () => this.reset());
  }
  addMultiSelectFilterButtonClickEvent() {
    const handleClick = e => {
      const filterValue = e.target.dataset.filter;
      if (e.target.matches(".active")) {
        e.target.classList.remove("active");
        const index = this.filters.categories.multiSelect.indexOf(filterValue);
        if (index > -1) {
          this.filters.categories.multiSelect.splice(index, 1);
        }
      } else {
        e.target.classList.add("active");
        console.log(this.filters.categories.multiSelect)
        this.filters.categories.multiSelect.push(filterValue);
      }
      this.clearList();
      this.filteredResults = this.filterResults();
      this.addItems(this.settings.initialItemsToDisplay);
    };
    console.log(this.filters.categories)
    this.multiSelectFilters.forEach(button =>{
      button.addEventListener("click", handleClick);
      if (this.filters.categories.multiSelect.includes(button.dataset.filter)){
        console.log(button.dataset.filter)
        button.click();
      }
    });
  }
  addSingleSelectFilterButtonClickEvent() {
    const handleClick = e => {
      e.preventDefault();
      e.stopPropagation();
      const filterValue = e.target.dataset.filter;

      if (e.target.matches(".active")) {
        e.target.classList.remove("active");
        this.filters.categories.singleSelect = "";
      } else {
        this.singleSelectFilters.forEach(el =>
          e.target === el
            ? el.classList.add("active")
            : el.classList.remove("active")
        );
        this.filters.categories.singleSelect = filterValue;
      }
      this.clearList();
      this.filteredResults = this.filterResults();
      this.addItems(this.settings.initialItemsToDisplay);
    };
    this.singleSelectFilters.forEach(button =>{
      button.addEventListener("click", handleClick)      
      if (button.dataset.filter === this.filters.categories.singleSelect){
        button.click();
      }
    });

  }
  addfilterPanelOpenClickEvent() {
    const handleClick = () => {
      this.openFilter();
    };
    this.filterOpenButton?.addEventListener("click", handleClick);
  }
  addfilterPanelCloseClickEvent() {
    const handleClick = () => {
      this.closeFilter();
    };
    this.filterCloseButton?.addEventListener("click", handleClick);
  }
  addSortOptionsToggleEventListener() {
    const handleClick = () => {
      console.log("show folder");
    };
    this.sortOptionsToggle?.addEventListener("click", handleClick);
  }
  addSearchInputEvent() {
    const debouncedFilter = this._debounce(
      term => this.filterResultsBySearch(term),
      300
    );
    this.data.forEach(item => {
      const node = document.createElement("div");
      node.innerHTML = item.excerpt;
      const excerptText = node.innerText;
      item.searchableString = item.title + ". " + excerptText;
    });
    this.searchInput?.addEventListener("input", () => {
      const searchTerm = this.searchInput.value;
      debouncedFilter(searchTerm);
    });
  }
  _combineSettings() {
    const globalSettings = window.wmSummaryBlockSettings || {};
    const instanceSettings = {};
    for (const key in this.el.dataset) {
      instanceSettings[key] = this.el.dataset[key];
    }
    this.settings = this.Utilities.deepMerger(
      {},
      WMSummaryBlock.defaultSettings,
      globalSettings,
      instanceSettings
    );
  }
  _debounce(func, delay) {
    let timerId;
    return function (...args) {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }
  _diffArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      // console.log("Arrays have different lengths");
      return true;
    }

    for (let i = 0; i < arr1.length; i++) {
      const keys1 = Object.keys(arr1[i]);

      for (const key of keys1) {
        const val1 = arr1[i][key];
        const val2 = arr2[i][key];

        // Check if both values are arrays
        if (Array.isArray(val1) && Array.isArray(val2)) {
          // Join the arrays into strings and compare
          if (val1.join(",") !== val2.join(",")) {
            // console.log(`Difference found in objects at index ${i}:`);
            // console.log(`Key: ${key}`);
            // console.log(`Value in first array:`, val1.join(","));
            // console.log(`Value in second array:`, val2.join(","));
            return true;
          }
        } else if (val1 !== val2) {
          // console.log(`Difference found in objects at index ${i}:`);
          // console.log(`Key: ${key}`);
          // console.log(`Value in first array:`, val1);
          // console.log(`Value in second array:`, val2);
          return true;
        }
      }
    }

    return false;
  }
}

(function () {
  function deconstruct() {
    //How should this plugin breakdown in edit mode
  }
  function addDeconstructListener() {
    // Observe changes to the body's class attribute
    const bodyObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.attributeName === "class") {
          const classList = document.body.classList;
          if (classList.contains("sqs-edit-mode-active")) {
            deconstruct();
            bodyObserver?.disconnect();
          }
        }
      });
    });

    bodyObserver.observe(document.body, {
      attributes: true,
    });
  }
  function afterInit() {}

  // Utility or helper functions
  function initPlugin() {
    let pluginEls = document.querySelectorAll(
      '[data-wm-plugin="summary-block"]:not([data-loading])'
    );
    if (!pluginEls.length) return;

    pluginEls.forEach(el => {
      el.dataset.loading = "loading";
      el.wmSummaryBlock = new WMSummaryBlock(el);
    });

    window.wmToolkit.Utilities.emitEvent(`${nameSpace}:ready`);
  }

  const nameSpace = "wmSummaryBlock";

  // Correctly expose the initPlugin method on the window
  window[nameSpace] = {
    init: () => {
      initPlugin();
      afterInit();
    },
    deconstruct: deconstruct,
  };

  // Now you can call the init method directly
  if (document.ready) {
    window[nameSpace].init();
    if (window.self !== window.top) addDeconstructListener();
  } else {
    window.addEventListener("DOMContentLoaded", () => {
      window[nameSpace].init();
      if (window.self !== window.top) addDeconstructListener();
    });
  }
})();
