// node class that will be used to build the binary tree
class Node {
        // constructor initialize node with the element and set up children
        constructor(value) {
                this.value = value;
                this.leftChild = null;
                this.rightChild = null;
        }
}

// binary tree class that will hold the root of the binary tree
class Tree {
        // constructor will initialize tree with root node
        constructor(root) {
                this.root = root;
        }
}

// function that creates the binary tree that was described in the interview question 1
// required to test the code for the function: convert_tree_to_expression
// returns the root of the f(g(x,y),z) binary tree
function createBinaryTree() {
        // create the binary tree root
        var tempRoot = new Node("f");

        // make g the left child of the root node
        tempRoot.leftChild = new Node("g");

        // make z the right child of the root node
        tempRoot.rightChild = new Node("z");

        // add x and y into the left and right child of g
        tempRoot.leftChild.leftChild = new Node("x");
        tempRoot.leftChild.rightChild = new Node("y");

        // return the tree was created
        return new Tree(tempRoot);
}

// inorder tree traversal to show the structure of the tree for interview question 2
function inOrderTreeTraversal(root) {
        if(root == null)
                return "";
        var string = inOrderTreeTraversal(root.leftChild);
        string += root.value;
        string += inOrderTreeTraversal(root.rightChild);
        return string;
}

// postorder tree traversal to show the structure of the tree for interview question 2
function postOrderTreeTraversal(root) {
        if(root == null)
                return "";
        var string = postOrderTreeTraversal(root.leftChild);
        string += postOrderTreeTraversal(root.rightChild);
        string += root.value;
        return string;
}

// solution for the first interview question, in order tree traversal to convert tree
// to its matching expression, code will write out the expression with commas and brackets
function convert_tree_to_expression(root) {
        // checks if the root of the tree is null, if it is prints out error to console
        if(root == null) {
                console.log("Error: The tree or subtree has a null value in its root");
                return null;
        }

        // base case for recursion
        // if the node is a leaf it will just return its own value
        if(root.leftChild == null && root.rightChild == null)
                return root.value;

        // the root's value is added to the expression when it is determined is
        // an internal node of the binary tree
        var string = root.value;
        // adds opening bracket, in which the children of the node will be added
        string += "(";
        // makes recursive call on left child if it exists, in the format in which
        // our example expressions are written there will always be a left node
	if(root.leftChild != null) {
		string += convert_tree_to_expression(root.leftChild);
        }
        // make recursive call on right child if it exists
        // adds comma to separate the left and right children of the node
	if(root.rightChild != null){
		string += ",";
		string += convert_tree_to_expression(root.rightChild);
        }
        // add closing bracket to close the expression described by the node's children
        string += ")";

        // return the string that has the expression that describes the binary tree
        // rooted at the node passed into this function
        return string;
}

// solution for the second question, build a binary tree for the given expression
// using a recursive algorithm
function build_tree(string) {
        // strings that hold the two subexpressions possible
        var subexpression1 = null;
        var subexpression2 = null;

        // error checking: ensure that the expression has the proper format
        // first check whether the first character is a letter
        if(!(string[0].toUpperCase() != string[0].toLowerCase())) {
                console.log("Error in expression, letter not found where binary tree node should be");
                return null;
        }

        // base case of recursion
        // check whether there is only one letter in the expression, then just
        // make a node and return it
        if(string.length === 1)
                return new Node(string[0]);

        // error checking: check that if there is an opening bracket after the letter, if there is not
        // an opening bracket then control moves to the else statement as the expression
        // being converted to a binary tree does not follow the format described during the interview
        if(string[1] === "(") {
                // error checking: ensure that there is a matching closing bracket at the end of the
                // expression to the opening bracket after the first letter in the expression
                if(string[string.length-1] !== ")") {
                        console.log("Error in expression, opening bracket doesn't match closing bracket");
                        return null;
                }

                // check whether there is a comma, meaning two expressions within the
                // brackets right after the letter, I do this by counting the number
                // of brackets that are opened, and if the same number of brackets are closed,
                // I check for a comma, if I find a comma I break the expression there into
                // two subexpressions
                // the expression is checked for commas in the brackets after the first letter in
                // the expression ie. f(____), expression represented by ____ is checked for commas
                // f and the first and last bracket have already been accounted for
                var commaIndex;
                var numberOfOpenBrackets = 0;
                for(var i = 2; i < string.length-1; i++) {
                        if(string[i] === "(")
                                numberOfOpenBrackets++;
                        if(string[i] === ")")
                                numberOfOpenBrackets--;
                        if(numberOfOpenBrackets < 0) {
                                console.log("Error in expression, too many closing brackets");
                                return null;
                        }
                        if(numberOfOpenBrackets === 0) {
                                if(string[i] === ",") {
                                        subexpression1 = string.substring(2,i);
                                        subexpression2 = string.substring(i+1, string.length-1);
                                        break;
                                }
                        }
                }

                // if nothing has been added to subexpression1, that means there was no comma
                // therefore don't need to break up the expression, put the entire subexpression
                // into the subexpression1 variable
                if(subexpression1 == null)
                        subexpression1 = string.substring(2, string.length-1);
        }
        else {
                console.log("Error in expression, cannot have two letters consecutively")
                return new Node(null);
        }

        // create the root node, whose value is the first letter in the expression entered
        var subtreeRoot = new Node(string[0]);

        // call this method recursively on the subexpressions depending on how many
        // subexpressions were present
        // if only one subexpression then add that to the left child, following
        // the convention laid out during the interview
        if(subexpression1 != null && subexpression2 != null) {
                subtreeRoot.leftChild = build_tree(subexpression1);
                subtreeRoot.rightChild = build_tree(subexpression2);
                return subtreeRoot;
        }
        else if(subexpression1 != null && subexpression2 == null) {
                subtreeRoot.leftChild = build_tree(subexpression1);
                return subtreeRoot;
        }
        else {
                return subtreeRoot;
        }
}

// call function to create the binary tree described during the interview, use the
// recursive method to print out the string
var treeExpression = createBinaryTree();

// this will print out the solution to the first interview question, which converts
// the binary tree into a proper expression
console.log("\n\nSolution to interview question number 1");
console.log(convert_tree_to_expression(treeExpression.root) + "\n\n");

// this expression will be used to test the solution for interview question 2
// user can change this expression to test the program
var stringExpression = "f(x(k(l,o)),g(n,m))";
console.log("The expression being used to test solution 2 is: " + stringExpression + "\n\n");

// the tree is built based on the expression in line 200, this is the solution to
// interview question 2
var builtTree = new Tree(build_tree(stringExpression));


// print out the tree built using the solution to question 2 by doing a in-order traversal,
// post-order traversal, if we have two of the three traversals we can reconstruct a binary tree
// this will ensure that the second solution is correct
console.log("The inorder traversal of the tree built using the expression provided is: ");
console.log(inOrderTreeTraversal(builtTree.root));
console.log("The postorder traversal of the tree built using the expression provided is: ");
console.log(postOrderTreeTraversal(builtTree.root) + "\n\n");

// printing out the tree in expression format using the algorithm designed in
// problem 1
// this means that the expression typed in line 200 can be used to test both the
// solution the interview question 1 and 2
console.log("The expression is printed out using the solution to problem 1:");
console.log(convert_tree_to_expression(builtTree.root) + "\n\n");
