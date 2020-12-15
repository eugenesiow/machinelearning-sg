const client = algoliasearch(
    'M6ZUWWMX92',
    '04808118cb3d4d561798e2322165a2e2'
);
const researchers = client.initIndex('researchers');
const coders = client.initIndex('coders');

autocomplete(
    '#aa-search-input',
    {
        debug: true,
        templates: {
            dropdownMenu:
                '<div class="aa-dataset-researcher"></div>'
        },
    },
    [
        {
            source: autocomplete.sources.hits(researchers, {hitsPerPage: 5}),
            displayKey: 'name',
            name: 'researcher',
            templates: {
                header: '<div class="aa-suggestions-category">Researchers</div>',
                suggestion(suggestion) {
                    return `<div class="d-flex flex-justify-start flex-items-center p-0 f5 navigation-item js-navigation-item js-jump-to-suggestion" role="option">
  <a tabindex="-1" class="no-underline d-flex flex-auto flex-items-center jump-to-suggestions-path js-jump-to-suggestion-path js-navigation-open p-2" href="/researcher/${suggestion.slug}">
    <span class="jump-to-suggestion-name js-jump-to-suggestion-name flex-auto overflow-hidden text-left no-wrap css-truncate css-truncate-target">${suggestion._highlightResult.name.value}</span>
  </a>
</div>`
                },
                empty: '<div class="aa-empty">No matching researchers</div>',
            },
        },
        {
            source: autocomplete.sources.hits(coders, {hitsPerPage: 5}),
            displayKey: 'name',
            name: 'coder',
            templates: {
                header: '<div class="aa-suggestions-category">Coders</div>',
                suggestion(suggestion) {
                    let slug = suggestion.login.toLowerCase()
                    return `<div class="d-flex flex-justify-start flex-items-center p-0 f5 navigation-item js-navigation-item js-jump-to-suggestion" role="option">
  <a tabindex="-1" class="no-underline d-flex flex-auto flex-items-center jump-to-suggestions-path js-jump-to-suggestion-path js-navigation-open p-2" href="/coder/${slug}">
    <span class="jump-to-suggestion-name js-jump-to-suggestion-name flex-auto overflow-hidden text-left no-wrap css-truncate css-truncate-target">${suggestion._highlightResult.name.value}</span>
  </a>
</div>`
                },
                empty: '<div class="aa-empty">No matching coders</div>',
            },
        },
    ]
);
