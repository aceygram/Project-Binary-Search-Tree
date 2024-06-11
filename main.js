class Node {
    constructor(d){
        this.data = d;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array){
        let sortedUniqueArray = this.sortAndRemoveDuplicates(array);
        this.root = this.buildTree(sortedUniqueArray, 0, sortedUniqueArray.length - 1);
    }

    buildTree(array, start, end){
        if (start > end){
            return null;
        }

        let mid = Math.floor((start + end) / 2);
        let node = new Node(array[mid]);

        node.left = this.buildTree(array, start, mid - 1);
        node.right = this.buildTree(array, mid + 1, end);
        return node;
    }

    sortAndRemoveDuplicates(array) {
        // Sort the array
        array.sort((a, b) => a - b);

        // Remove duplicates
        let uniqueArray = [];
        for (let i = 0; i < array.length; i++) {
            if (i === 0 || array[i] !== array[i - 1]) {
                uniqueArray.push(array[i]);
            }
        }
        console.log(uniqueArray);
        return uniqueArray;
    }

    insert(value, node = this.root){
        if (value < node.data){
            if (node.left === null){
                node.left = new Node(value);
            } else {
                this.insert(value, node.left);
            }
        } else if (value > node.data){
            if (node.right === null){
                node.right = new Node(value);
            } else {
                this.insert(value, node.right);
            }
        }
    }

    delete(value, node = this.root){
        if (node === null){
            return null;
        }

        if (value < node.data){
            node.left = this.delete(value, node.left);
        } else if (value > node.data){
            node.right = this.delete(value, node.right);
        } else {
            if (node.left === null) {
                return node.right;
            } else if (node.right === null){
                return node.left;
            }

            // Node with two children: Get the in-order successor (smallest in the right subtree)
            node.data = this.minValue(node.right);

            // Delete the in-order successor
            node.right = this.delete(node.data, node.right);
        }

        return node;
    }

    minValue(node) {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current.data;
    }

    find(value, node = this.root) {
        if (node === null || node.data === value) {
            return node;
        }

        if (value < node.data) {
            return this.find(value, node.left);
        } else {
            return this.find(value, node.right);
        }
    }

    levelOrder(callback) {
        let result = [];
        let queue = [];

        if (!this.root) {
            return result;
        }

        queue.push(this.root);

        while (queue.length > 0) {
            const current = queue.shift();
            result.push(current.data);

            if (current.left) {
                queue.push(current.left);
            }

            if (current.right) {
                queue.push(current.right);
            }

            if (callback) {
                callback(current);
            }
        }

        if (callback) {
            return;
        } else {
            return result;
        }
    }

    inOrder(callback) {
        function traverse(node, result = []) {
            if (!node) return;
            traverse(node.left, result);
            result.push(node.data);
            if (callback) {
                callback(node);
            }
            traverse(node.right, result);
            return result;
        }

        return callback ? traverse(this.root) : traverse(this.root, []);
    }

    preOrder(callback) {
        function traverse(node, result = []) {
            if (!node) return;
            result.push(node.data);
            if (callback) {
                callback(node);
            }
            traverse(node.left, result);
            traverse(node.right, result);
            return result;
        }

        return callback ? traverse(this.root) : traverse(this.root, []);
    }

    postOrder(callback) {
        function traverse(node, result = []) {
            if (!node) return;
            traverse(node.left, result);
            traverse(node.right, result);
            result.push(node.data);
            if (callback) {
                callback(node);
            }
            return result;
        }

        return callback ? traverse(this.root) : traverse(this.root, []);
    }

    height(node) {
        if (node === null) {
            return -1;
        }
        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(node, current = this.root, currentDepth = 0) {
        if (current === null) {
            return -1; // Node not found
        }
        if (current === node) {
            return currentDepth;
        }
        let leftDepth = this.depth(node, current.left, currentDepth + 1);
        if (leftDepth !== -1) {
            return leftDepth;
        }
        return this.depth(node, current.right, currentDepth + 1);
    }

    isBalanced(node = this.root) {
        function checkHeightBalance(node) {
            if (node === null) {
                return {height: -1, balanced: true};
            }

            const left = checkHeightBalance(node.left);
            const right = checkHeightBalance(node.right);

            const balanced = left.balanced && right.balanced && Math.abs(left.height - right.height) <= 1;
            const height = Math.max(left.height, right.height) + 1;

            return {height, balanced};
        }

        return checkHeightBalance(node).balanced;
    }

    rebalance() {
        const nodes = this.inOrder(); // Get nodes in sorted order
        this.root = this.buildTree(nodes, 0, nodes.length - 1); // Rebuild the tree
    }
}

function getRandomArray(size) {
    let arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * 100));
    }
    return arr;
}

function createBSTFromRandomArray(size) {
    let randomArray = getRandomArray(size);
    return new Tree(randomArray);
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null || node === undefined) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};


(function driverScript() {
    let tree = createBSTFromRandomArray(10);

prettyPrint(tree.root);

// Get the height of a specific node
// const specificNode = tree.find(3);
// const nodeHeight = tree.height(specificNode);
// console.log("Height of the node:", nodeHeight);


// const nodeDepth = tree.depth(specificNode);
// console.log("Depth of the node:", nodeDepth);

// Check if the tree is balanced
console.log("Is the tree balanced?", tree.isBalanced());
console.log(tree.levelOrder());
console.log(tree.preOrder());;
console.log(tree.postOrder());;
console.log(tree.inOrder());

const numbersAbove100 = [101, 139, 127, 169, 172, 198, 180];

numbersAbove100.forEach(num => tree.insert(num));

console.log("Is the tree balanced?", tree.isBalanced());

prettyPrint(tree.root);

tree.rebalance();

console.log("Is the tree balanced?", tree.isBalanced());

prettyPrint(tree.root);

console.log(tree.levelOrder());
console.log(tree.preOrder());;
console.log(tree.postOrder());;
console.log(tree.inOrder());
})();