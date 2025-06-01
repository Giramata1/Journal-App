
import { render, screen, fireEvent } from '@testing-library/react';
import EntryForm from '@/components/EntryForm';

describe('EntryForm input fields', () => {
  const mockOnSave = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    mockOnSave.mockClear();
    mockOnCancel.mockClear();
  });

  it('updates the title input when typing', () => {
    render(<EntryForm onSave={mockOnSave} onCancel={mockOnCancel} />);

    const titleInput = screen.getByLabelText(/title/i);
    fireEvent.change(titleInput, { target: { value: 'My Journal Title' } });
    expect(titleInput).toHaveValue('My Journal Title');
  });

  it('updates the content textarea when typing', () => {
    render(<EntryForm onSave={mockOnSave} onCancel={mockOnCancel} />);

    const contentTextarea = screen.getByLabelText(/content/i);
    fireEvent.change(contentTextarea, { target: { value: 'Some journal content...' } });
    expect(contentTextarea).toHaveValue('Some journal content...');
  });
});
