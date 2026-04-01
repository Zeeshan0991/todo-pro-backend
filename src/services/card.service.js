const { Card } = require("../entities");

/**
 * CREATE CARD
 */
exports.createCard = async (data) => {
  return await Card.create(data);
};

/**
 * GET CARDS BY LIST
 */
exports.getCardsByList = async (listId) => {
  return await Card.findAll({
    where: { listId },
    order: [["createdAt", "ASC"]],
  });
};