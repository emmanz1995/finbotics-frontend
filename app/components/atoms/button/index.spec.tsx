import { render, fireEvent, screen } from '@testing-library/react';
import Button from '@/app/components/atoms/button/index';

describe('when the button is clicked', () => {
  const mockClick = jest.fn();
  it('should render the button', () => {
    render(<Button variant={'outline'}>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should fire the button clicked', () => {
    render(
      <Button variant={'outline'} onClick={mockClick}>
        Click me!
      </Button>
    );
    const button = screen.getByText('Click me!');
    fireEvent.click(button);

    expect(button).toBeInTheDocument();
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});
