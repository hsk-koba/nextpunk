import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MJTimePicker } from './MJTimePicker';

const meta: Meta<typeof MJTimePicker> = {
  component: MJTimePicker,
  title: 'Molecules/MJTimePicker',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'outline', 'text', 'danger', 'default'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    placeholder: { control: 'text' },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 24, maxWidth: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof MJTimePicker>;

export const Default: Story = {
  args: {
    placeholder: '時刻を選択',
    label: '時刻',
  },
};

export const WithValue: Story = {
  render: function WithValueStory() {
    const [time, setTime] = useState<Date | null>(() => {
      const d = new Date();
      d.setHours(14, 30, 0, 0);
      return d;
    });
    return (
      <MJTimePicker
        label="開始時刻"
        value={time}
        onChange={setTime}
        placeholder="時刻を選択"
      />
    );
  },
};

export const StringValue: Story = {
  args: {
    label: '時刻',
    value: '09:15',
    onChange: (d) => console.log('onChange', d?.toTimeString()),
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    label: '時刻',
    placeholder: '時刻を選択',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    label: '終了時刻',
    placeholder: '時刻を選択',
    errorMessage: '時刻を選択してください',
  },
};

export const Disabled: Story = {
  args: {
    label: '時刻',
    value: '12:00',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    label: '時刻',
    placeholder: '時刻を選択',
    loading: true,
  },
};
