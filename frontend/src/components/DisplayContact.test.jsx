import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DisplayContact from './DisplayContact';
import { vi } from 'vitest'; // Import vi for mock functions

// Define contact globally so it's available for all tests
const contact = {
  name: 'John Doe',
  number: '123-456-7890'
};

test('renders contact name and number', () => {
  render(<DisplayContact person={contact} />);

  const nameElement = screen.getByText('John Doe');
  const numberElement = screen.getByText('123-456-7890');

  expect(nameElement).toBeDefined();
  expect(numberElement).toBeDefined();
});

test('clicking the delete button calls event handler once', async () => {
  const mockHandler = vi.fn(); // Create mock function

  render(<DisplayContact person={contact} onClickx={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText('Delete');

  await user.click(button); // Simulate button click

  expect(mockHandler).toHaveBeenCalledTimes(1); // Ensure handler was called once
});
