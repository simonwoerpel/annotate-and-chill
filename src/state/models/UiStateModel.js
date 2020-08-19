import { action, thunkOn } from 'easy-peasy';
import { clearCanvas } from '~/util/draw';

const UiStateModel = {
  annotations: {
    show: false,
    hilighted: undefined,
    toggle: action((state, value) => {
      if (typeof value === 'undefined') {
        value = !state.annotationForm.show;
      }
      state.show = value;
    }),
    hilight: action((state, id) => {
      state.hilighted = id;
    }),
  },
  annotationForm: {
    show: false,
    position: [0, 0],
    toggle: action((state, value) => {
      if (typeof value === 'undefined') {
        value = !state.show;
      }
      state.show = value;
    }),
    setPosition: action((state, [top, left]) => {
      state.position = [top, left];
    }),
  },
  draw: {
    activeCanvas: undefined,
    setActiveCanvas: action((state, canvas) => {
      state.activeCanvas = canvas;
    }),
    clearCanvas: action(state => clearCanvas(state.activeCanvas)),
  },
  importer: {
    show: false,
    toggle: action((state, value) => {
      if (typeof value === 'undefined') {
        value = !state.show;
      }
      state.show = value;
    }),
  },

  // listeners
  onCreateAnnotation: thunkOn(
    (_, { annotations }) => annotations.createAnnotation,
    ({ draw, annotationForm }) =>
      draw.clearCanvas() && annotationForm.toggle(false)
  ),
  onLoadCsvSuccess: thunkOn(
    (_, { annotations }) => annotations.loadCsvSuccess,
    ({ importer }) => importer.toggle(false)
  ),
};

export default UiStateModel;
