export function pbDesc(node, ctx) {
    return {
        _pbBoardId: ctx.boardId,
        _pbCardId: node.getId(),
        _pbLink: node.getLink()
    };
}
//# sourceMappingURL=description.js.map