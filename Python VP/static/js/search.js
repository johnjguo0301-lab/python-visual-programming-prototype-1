// Block search - filters toolbox blocks by name
const BlockSearch = (() => {
    // Map of all block types to their display names (built from toolbox)
    let blockIndex = [];

    function buildIndex(toolboxDef) {
        blockIndex = [];
        if (!toolboxDef || !toolboxDef.contents) return;
        toolboxDef.contents.forEach(function(cat) {
            if (cat.kind !== 'category' || !cat.contents) return;
            var catName = cat.name;
            cat.contents.forEach(function(item) {
                if (item.kind === 'block' && item.type) {
                    blockIndex.push({
                        type: item.type,
                        category: catName,
                        label: item.type.replace(/_/g, ' ')
                    });
                }
            });
        });
    }

    function search(query) {
        if (!query || !query.trim()) return [];
        var q = query.toLowerCase().trim();
        return blockIndex.filter(function(entry) {
            return entry.label.indexOf(q) !== -1 ||
                   entry.category.toLowerCase().indexOf(q) !== -1 ||
                   entry.type.toLowerCase().indexOf(q) !== -1;
        });
    }

    function showResults(results, workspace) {
        // Remove any existing search results overlay
        var existing = document.getElementById('search-results');
        if (existing) existing.remove();

        if (results.length === 0) return;

        var container = document.createElement('div');
        container.id = 'search-results';

        results.slice(0, 12).forEach(function(entry) {
            var item = document.createElement('div');
            item.className = 'search-result-item';
            item.innerHTML = '<span class="sr-name">' + entry.label + '</span>' +
                             '<span class="sr-cat">' + entry.category + '</span>';
            item.addEventListener('click', function() {
                // Create the block in the workspace
                var block = workspace.newBlock(entry.type);
                block.initSvg();
                block.render();
                // Position near center of visible area
                var metrics = workspace.getMetrics();
                var x = metrics.viewLeft + metrics.viewWidth / 3;
                var y = metrics.viewTop + metrics.viewHeight / 3;
                block.moveBy(x, y);
                container.remove();
                document.getElementById('block-search').value = '';
            });
            container.appendChild(item);
        });

        document.getElementById('blockly-container').appendChild(container);
    }

    function hideResults() {
        var existing = document.getElementById('search-results');
        if (existing) existing.remove();
    }

    return { buildIndex, search, showResults, hideResults };
})();
