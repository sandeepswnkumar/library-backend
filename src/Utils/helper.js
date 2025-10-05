export const getOffset = (limit = 0, page = 1) => {
    const validPage = Math.max(page, 1);
    const offset = limit * (validPage - 1);
    return offset;
}