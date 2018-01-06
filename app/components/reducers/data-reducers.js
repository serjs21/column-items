import {createReducer} from 'redux-immutablejs'
import {ACTION_NAMES} from '../consts';
import {Map, List, fromJS} from 'immutable';

const initData = {
  columns: [{
    title:     'Column 1',
    cardsData: []
  },
    {
      title:     'Column 2',
      cardsData: []
    },
    {
      title:     'Column 3',
      cardsData: []
    }
  ]
};

const INITIAL_STATE = fromJS(initData);

export const addCard = (state, {columnId}) => {
  return state.setIn(['columns', columnId, 'cardsData'], (state.getIn(['columns', columnId, 'cardsData'], List())).push(Map()));
};

export const updateCard = (state, {cardTitle, cardData, id, columnId}) => {
  return state.setIn(['columns', columnId, 'cardsData', id], fromJS({
    title: cardTitle,
    data:  cardData,
  }));
};

export const removeCard = (state, {id, columnId}) => {
  return state.deleteIn(['columns', columnId, 'cardsData', id]);
};

export const moveCard = (state, {srcCardId, srcColumnId, dstCardId, dstColumnId}) => {
  const srcCard           = state.getIn(['columns', srcColumnId, 'cardsData', srcCardId], Map());
  const newState          = state.deleteIn(['columns', srcColumnId, 'cardsData', srcCardId]);
  const oldDstColumnState = newState.getIn(['columns', dstColumnId, 'cardsData'], List());
  return newState.setIn(['columns', dstColumnId, 'cardsData'], oldDstColumnState.insert(dstCardId, srcCard));
};


export default createReducer(INITIAL_STATE, {
  [ACTION_NAMES.ADD_CARD]:    addCard,
  [ACTION_NAMES.REMOVE_CARD]: removeCard,
  [ACTION_NAMES.UPDATE_CARD]: updateCard,
  [ACTION_NAMES.MOVE_CARD]:   moveCard,
})

