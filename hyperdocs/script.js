document.addEventListener('DOMContentLoaded', () => {
    const treeNodes = document.querySelectorAll('.tree-node');

    treeNodes.forEach(node => {
        node.addEventListener('click', () => {
            const subList = node.nextElementSibling;
            if (subList && subList.tagName === 'UL') {
                subList.classList.toggle('active');
            }
        });
    });
}); 