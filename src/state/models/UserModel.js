import { action, computed, thunkOn } from 'easy-peasy';
import { getRandomColor } from '~/util';

const UserModel = {
  email: undefined,
  firstName: undefined,
  lastName: undefined,
  color: getRandomColor(),
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
