"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTree = (list) => {
    const temp = {};
    const tree = {};
    for (let i in list) {
        temp[list[i].id] = list[i];
    }
    for (let i in temp) {
        if (temp[i].parentId) {
            if (!temp[temp[i].parentId].children) {
                temp[temp[i].parentId].children = new Object();
            }
            temp[temp[i].parentId].children[temp[i].id] = temp[i];
        }
        else {
            tree[temp[i].id] = temp[i];
        }
    }
    return tree;
};
exports.buildTreeList = (source) => {
    let cloneData = JSON.parse(JSON.stringify(source));
    return cloneData.filter(father => {
        let branchArr = cloneData.filter(child => father.id === child.parentId);
        branchArr.length > 0 ? (father.children = branchArr) : '';
        return father.parentId == null;
    });
};
//# sourceMappingURL=buildTree.js.map