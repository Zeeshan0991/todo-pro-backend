const cardService = require("../services/card.service");
const { List, Project, Workspace } = require("../entities");

/**
 * CREATE CARD
 */
exports.createCard = async (req, res) => {
  try {
    const { title, description, listId } = req.body;
    const userId = req.user.id;

    if (!title || !listId) {
      return res.status(400).json({
        message: "title and listId are required",
      });
    }

    // 🔒 Validate ownership through full chain
    const list = await List.findOne({
      where: { id: listId },
      include: {
        model: Project,
        include: {
          model: Workspace,
        },
      },
    });

    if (
      !list ||
      list.Project.Workspace.userId !== userId
    ) {
      return res.status(403).json({
        message: "Unauthorized list access",
      });
    }

    const card = await cardService.createCard({
      title,
      description,
      listId,
    });

    res.status(201).json(card);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create card",
    });
  }
};

/**
 * GET CARDS (list scoped)
 */
exports.getCards = async (req, res) => {
  try {
    const { listId } = req.query;
    const userId = req.user.id;

    if (!listId) {
      return res.status(400).json({
        message: "listId is required",
      });
    }

    // 🔒 Validate ownership
    const list = await List.findOne({
      where: { id: listId },
      include: {
        model: Project,
        include: {
          model: Workspace,
        },
      },
    });

    if (
      !list ||
      list.Project.Workspace.userId !== userId
    ) {
      return res.status(403).json({
        message: "Unauthorized list access",
      });
    }

    const cards = await cardService.getCardsByList(listId);

    res.status(200).json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch cards",
    });
  }
};