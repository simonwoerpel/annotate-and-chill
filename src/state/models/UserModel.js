import { action, computed, thunkOn } from 'easy-peasy';
import tinycolor from 'tinycolor2';
import { getRandomColor } from '~/util';

// used in `CirclePicker` of `ProfileForm`
const colors = [
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#ffc107',
  '#ff9800',
  '#ff5722',
  '#795548',
  '#607d8b',
];

const UserModel = {
  email: undefined,
  firstName: undefined,
  lastName: undefined,
  color: tinycolor(colors[Math.floor(Math.random() * colors.length)]).toRgb(),
  colors,
  // name: computed(s => `${s.firstName} ${s.lastName}`),
  name: computed(s => s.firstName),
  exists: computed(s => !!s.email),
  otherUsers: {},
  update: action((state, { email, firstName, lastName, color }) => {
    if (email) state.email = email;
    if (firstName) state.firstName = firstName;
    if (lastName) state.lastName = lastName;
    if (color) state.color = color;
  }),
  updateOtherUsers: action((state, { data }) => {
    data.map(d => {
      if (d.email !== state.email) {
        state.otherUsers[d.email] = {
          email: d.email,
          firstName: d.firstName,
          lastName: d.lastName,
          color: getRandomColor(),
          ...state.otherUsers[d.email],
        };
      }
      return d;
    });
  }),
  onLoadCsvSuccess: thunkOn(
    (_, { annotations }) => annotations.loadCsvSuccess,
    (actions, { payload }) => actions.updateOtherUsers(payload)
  ),
};

export default UserModel;
