import {ACTION_NAMES} from '../consts';

export const addCard = columnId => {
  return {
    type: ACTION_NAMES.ADD_CARD,
    columnId,
  }
};

export const updateCard = ({cardTitle, cardData, id, columnId}) => {
  return {
    type: ACTION_NAMES.UPDATE_CARD,
    cardTitle,
    cardData,
    id,
    columnId,
  }
};

export const removeCard = ({id, columnId}) => {
  return {
    type: ACTION_NAMES.REMOVE_CARD,
    id,
    columnId,
  }
};

export const moveCard = ({srcCardId, srcColumnId, dstCardId, dstColumnId}) => {
  return {
    type: ACTION_NAMES.MOVE_CARD,
    srcCardId,
    srcColumnId,
    dstCardId,
    dstColumnId,
  }
};
