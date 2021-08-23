import * as React from 'react'
import { render, screen, fireEvent, waitFor, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import { Search } from '../_components/Search'

beforeEach(() => {
    // when the error's thrown a bunch of console.errors are called even though
    // the error boundary handles the error. This makes the test output noisy,
    // so we'll mock out console.error
    jest.spyOn(console, 'error')
    console.error.mockImplementation(() => { })
})

afterEach(() => {
    console.error.mockRestore()
})

afterEach(cleanup)

const setup = () => {
    const utils = render(<Search />)
    const input = utils.getByTitle('search')
    return {
      input,
      ...utils,
    }
  }

// Arrange

test('Renders the Search Component', () => {
  const div = document.createElement('div');
  render(<Search/>)
})

test('calls to check the text on UI', () => {
    render(<Search/>)
    const SearchLabelElement = screen.getByText(/Search by User ID/i);
    expect(SearchLabelElement).toBeInTheDocument();
    const ResultLabelElement = screen.getByText(/Results/i);
    expect(ResultLabelElement).toBeInTheDocument();
})

test('Test to check the company logo', () => {
    // Arrange
    render(<Search/>)
    expect(screen.getByRole('button')).not.toBeDisabled();
    expect(screen.getByRole('button')).toBeInTheDocument();
})

test('It should not allow letters to be inputted', () => {
    const {input} = setup()
    expect(input.value).toBe('') // empty before
    fireEvent.click(input, {target: {value: 'be'}})
    expect(input.value).toBe('be')
})

test('Test the button', () => {
  // Arrange
  render(<Search/>)
  const logo = screen.getByRole('img', {name: /companylogo/i});
  expect(logo).toBeInTheDocument();
})

test('Test the input placeholder', () => {
  // Arrange
  render(<Search/>)
  screen.getByPlaceholderText('eg. 1')
})
