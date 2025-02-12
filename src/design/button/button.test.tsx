import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Button from './button';

describe('Button', () => {
    it('should render button with text', () => {
        render(<Button onClick={() => { }} >
            Click me
        </Button>);
        screen.debug();
        const button = screen.getByRole('button', { name: 'Click me' });
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent('Click me');
    })
});