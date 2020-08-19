import React, { useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import tinycolor from 'tinycolor2';
import { Modal, Button, Form } from 'semantic-ui-react';
import { CirclePicker } from 'react-color';
import { formatRgba } from '~/util';

const ProfileForm = ({ data, updateData, colors }) => {
  const { firstName, lastName, email, color } = data;

  return (
    <Form className="ProfileForm">
      <Form.Field>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          placeholder="you@example.org"
          value={email}
          onChange={e => updateData({ ...data, email: e.target.value })}
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={e => updateData({ ...data, firstName: e.target.value })}
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={e => updateData({ ...data, lastName: e.target.value })}
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="color">Choose your color</label>
        <CirclePicker
          colors={colors}
          color={color}
          onChange={({ rgb }) => updateData({ ...data, color: rgb })}
        />
      </Form.Field>
    </Form>
  );
};

const ProfileModal = ({ children, open, setOpen, onSubmit }) => (
  <Modal
    onClose={() => setOpen(false)}
    onOpen={() => setOpen(true)}
    open={open}
    dimmer="blurring"
  >
    <Modal.Header>Hi!</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <p>Tell me who you are so I can assign annotations to you.</p>
      </Modal.Description>
      {children}
    </Modal.Content>
    <Modal.Actions>
      <Button
        content="Save"
        labelPosition="right"
        icon="checkmark"
        onClick={onSubmit}
        positive
      />
    </Modal.Actions>
  </Modal>
);

const Profile = () => {
  const {
    exists,
    name,
    color,
    colors,
    firstName = '',
    lastName = '',
    email = '',
  } = useStoreState(s => s.user);
  const [showForm, toggleForm] = useState(!exists);
  const update = useStoreActions(s => s.user.update);
  const onSubmit = data => update(data) && toggleForm(false);
  const [data, updateData] = useState({ firstName, lastName, email, color });

  return (
    <div className="Profile">
      {exists && (
        <p>
          Hi {name}{' '}
          <Button
            circular
            icon="wrench"
            style={{
              backgroundColor: formatRgba(color),
              color: tinycolor
                .mostReadable(color, [
                  'grey',
                  'darkgrey',
                  'lightgrey',
                  'white',
                  'black',
                ])
                .toHexString(),
            }}
            onClick={() => toggleForm(true)}
          />
        </p>
      )}
      <ProfileModal
        open={showForm}
        setOpen={toggleForm}
        onSubmit={() => onSubmit(data)}
      >
        <ProfileForm data={data} updateData={updateData} colors={colors} />
      </ProfileModal>
    </div>
  );
};

export default Profile;
