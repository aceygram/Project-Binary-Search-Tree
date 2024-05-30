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

let arr = [1,3,5,6,7,8,9,4,9,2,3];

const tree = new Tree(arr);
tree.insert(10);
tree.delete(10);

prettyPrint(tree.root);

tree.insert(11);
tree.insert(12);
tree.delete(11);


prettyPrint(tree.root);


