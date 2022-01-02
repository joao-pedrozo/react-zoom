import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import 'jest-styled-components';
import AvatarUpload from '.';

const mockSliderTestId = 'slider-input';
//eslint-disable-next-line react/display-name
jest.mock('@material-ui/core/Slider', () => (props: any) => {
	const { id, name, min, max, onChange } = props;
	return (
		<input
			data-testid={mockSliderTestId}
			type='range'
			id={id}
			name={name}
			min={min}
			max={max}
			onChange={event => onChange && onChange(event, parseInt(event.target.value))}
		/>
	);
});

describe('<AvatarUpload />', () => {
	beforeEach(() => {
		window.URL.createObjectURL = jest.fn();

		render(<AvatarUpload />);
	});

	describe('Behaviour', () => {
		it('renders the component', () => {
			const { container } = render(<AvatarUpload />);

			expect(container).toBeInTheDocument();
		});

		it('changes the component when image file is uploaded', () => {
			const file = new File(['file'], 'file.png', { type: 'image/png' });

			const insertImageText = screen.getByLabelText('Insert Image');
			expect(insertImageText).toBeInTheDocument();

			const input = screen.getByTestId('input-file');
			fireEvent.change(input, { target: { files: [file] } });
			fireEvent.input(input);

			const slider = screen.getByTestId(mockSliderTestId);
			expect(slider).toBeInTheDocument();

			const saveButton = screen.getByText('Save');
			expect(saveButton).toBeInTheDocument();
		});

		it('shows error component when uploaded file is incorrect', () => {
			const file = new File(['file'], 'file.mp3', { type: 'image/mp3' });

			const insertImageText = screen.getByLabelText('Insert Image');
			expect(insertImageText).toBeInTheDocument();

			const input = screen.getByTestId('input-file');
			fireEvent.change(input, { target: { files: [file] } });
			fireEvent.input(input);

			const errorMessage = screen.getByText('Sorry, the upload failed.');
			expect(errorMessage).toBeInTheDocument();
		});

		it('allows user to try upload again after uploading incorrect file and clicking on X icon', () => {
			const file = new File(['file'], 'file.mp3', { type: 'image/mp3' });

			const insertImageText = screen.getByLabelText('Insert Image');
			expect(insertImageText).toBeInTheDocument();

			const input = screen.getByTestId('input-file');
			fireEvent.change(input, { target: { files: [file] } });
			fireEvent.input(input);

			const errorMessage = screen.getByText('Sorry, the upload failed.');
			expect(errorMessage).toBeInTheDocument();

			const XIcon = screen.getByLabelText('XIcon');
			fireEvent.click(XIcon);

			const insertImageText2 = screen.getByLabelText('Insert Image');
			expect(insertImageText2).toBeInTheDocument();

			const file2 = new File(['file'], 'file.png', { type: 'image/png' });
			const input2 = screen.getByTestId('input-file');
			fireEvent.change(input2, { target: { files: [file2] } });
			fireEvent.input(input2);

			const slider = screen.getByTestId(mockSliderTestId);
			expect(slider).toBeInTheDocument();

			const saveButton = screen.getByText('Save');
			expect(saveButton).toBeInTheDocument();
		});

		it('allows user to try upload again after uploading incorrect file and clicking on Try Again', () => {
			const file = new File(['file'], 'file.mp3', { type: 'image/mp3' });

			const insertImageText = screen.getByLabelText('Insert Image');
			expect(insertImageText).toBeInTheDocument();

			const input = screen.getByTestId('input-file');
			fireEvent.change(input, { target: { files: [file] } });
			fireEvent.input(input);

			const errorMessage = screen.getByText('Sorry, the upload failed.');
			expect(errorMessage).toBeInTheDocument();

			const tryAgain = screen.getByLabelText('Try Again');
			fireEvent.click(tryAgain);

			const insertImageText2 = screen.getByLabelText('Insert Image');
			expect(insertImageText2).toBeInTheDocument();

			const file2 = new File(['file'], 'file.png', { type: 'image/png' });
			const input2 = screen.getByTestId('input-file');
			fireEvent.change(input2, { target: { files: [file2] } });
			fireEvent.input(input2);

			const slider = screen.getByTestId(mockSliderTestId);
			expect(slider).toBeInTheDocument();

			const saveButton = screen.getByText('Save');
			expect(saveButton).toBeInTheDocument();
		});

		it('allows user to go back to initial state after uploading image', () => {
			const file = new File(['file'], 'file.png', { type: 'image/png' });

			const insertImageText = screen.getByLabelText('Insert Image');
			expect(insertImageText).toBeInTheDocument();

			const input = screen.getByTestId('input-file');
			fireEvent.change(input, { target: { files: [file] } });
			fireEvent.input(input);

			const slider = screen.getByTestId(mockSliderTestId);
			expect(slider).toBeInTheDocument();

			const saveButton = screen.getByText('Save');
			expect(saveButton).toBeInTheDocument();

			const XIcon = screen.getByLabelText('XIcon');
			fireEvent.click(XIcon);

			const insertImageText2 = screen.getByLabelText('Insert Image');
			expect(insertImageText2).toBeInTheDocument();
		});

		it('zooms Image when slider is changed', () => {
			const file = new File(['file'], 'file.png', { type: 'image/png' });

			const insertImageText = screen.getByLabelText('Insert Image');
			expect(insertImageText).toBeInTheDocument();

			const input = screen.getByTestId('input-file');
			fireEvent.change(input, { target: { files: [file] } });
			fireEvent.input(input);

			const slider = screen.getByTestId(mockSliderTestId);
			expect(slider).toBeInTheDocument();

			const saveButton = screen.getByText('Save');
			expect(saveButton).toBeInTheDocument();

			const image = screen.getByLabelText('Image');

			expect(image.style.transform).toBe('scale(1)');

			fireEvent.change(slider, {
				target: { value: 5 },
			});

			expect(image.style.transform).toBe('scale(1.5)');
		});

		it('displays zoomed image after saving', () => {
			const file = new File(['file'], 'file.png', { type: 'image/png' });

			const insertImageText = screen.getByLabelText('Insert Image');
			expect(insertImageText).toBeInTheDocument();

			const input = screen.getByTestId('input-file');
			fireEvent.change(input, { target: { files: [file] } });
			fireEvent.input(input);

			const slider = screen.getByTestId(mockSliderTestId);
			expect(slider).toBeInTheDocument();

			const saveButton = screen.getByText('Save');
			expect(saveButton).toBeInTheDocument();

			const image = screen.getByLabelText('Image');

			expect(image.style.transform).toBe('scale(1)');

			fireEvent.change(slider, {
				target: { value: 5 },
			});

			expect(image.style.transform).toBe('scale(1.5)');

			const saveButton2 = screen.getByText('Save');

			fireEvent.click(saveButton2);

			expect(image.style.transform).toBe('scale(1.5)');

			const insertImageText2 = screen.getByLabelText('Insert Image');
			expect(insertImageText2).toBeInTheDocument();

			const image2 = screen.getByLabelText('Image');

			expect(image2.style.transform).toBe('scale(1.5)');
		});
	});
});
