// edtReducer.ts
import { ADD_EVENT, MOVE_EVENT, UPDATE_EVENT, SET_EVENTS } from '../actions/edtActions';
interface Event {
  id: string;
  title: string;
  professor: string;
  color: string;
  day: string;
  hour: number;
}
interface EdtState {
  events: Event[];
}
const initialState: EdtState = {
  events: []
};
const edtReducer = (state = initialState, action: any): EdtState => {
  switch (action.type) {
    case ADD_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload]
      };
    case MOVE_EVENT:
      const { draggableId, updatedEvent } = action.payload;
      return {
        ...state,
        events: state.events.map(event =>
          event.id === draggableId ? updatedEvent : event
        )
      };
    case UPDATE_EVENT:
      return {
        ...state,
        events: state.events.map(event =>
          event.id === action.payload.id ? action.payload : event
        )
      };
    case SET_EVENTS:
      return {
        ...state,
        events: action.payload
      };
    default:
      return state;
  }
};
export default edtReducer;