import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

describe('App Component', () => {
  beforeEach(() => {
    mock.reset();
  });

  test('renders the heading', async () => {
    render(<App />);
    const heading = await screen.findByText(/IP Address Locator/i);
    expect(heading).toBeInTheDocument();
  });

  test('fetches and displays IP details', async () => {
    const ipData = {
      ip: '8.8.8.8',
      city: 'Mountain View',
      region_name: 'California',
      country_name: 'United States',
      org: 'Google LLC',
      latitude: 37.3861,
      longitude: -122.0839,
    };

    mock.onGet(`http://api.ipapi.com/api/check?access_key=${process.env.REACT_APP_IPAPI_KEY}`).reply(200, ipData);

    render(<App />);

    expect(await screen.findByText(/8.8.8.8/i)).toBeInTheDocument();
    expect(await screen.findByText(/Mountain View/i)).toBeInTheDocument();
    expect(await screen.findByText(/California/i)).toBeInTheDocument();
    expect(await screen.findByText(/United States/i)).toBeInTheDocument();
    expect(await screen.findByText(/Google LLC/i)).toBeInTheDocument();
  });

  test('handles IP search input correctly', async () => {
    const ipData = {
      ip: '1.1.1.1',
      city: 'Sydney',
      region_name: 'New South Wales',
      country_name: 'Australia',
      org: 'Cloudflare Inc',
      latitude: -33.8675,
      longitude: 151.2070,
    };

    mock.onGet(`http://api.ipapi.com/api/1.1.1.1?access_key=${process.env.REACT_APP_IPAPI_KEY}`).reply(200, ipData);

    render(<App />);

    fireEvent.change(screen.getByPlaceholderText(/Enter IP address/i), { target: { value: '1.1.1.1' } });
    fireEvent.click(screen.getByText(/Search/i));

    expect(await screen.findByText(/1.1.1.1/i)).toBeInTheDocument();
    expect(await screen.findByText(/Sydney/i)).toBeInTheDocument();
    expect(await screen.findByText(/New South Wales/i)).toBeInTheDocument();
    expect(await screen.findByText(/Australia/i)).toBeInTheDocument();
    expect(await screen.findByText(/Cloudflare Inc/i)).toBeInTheDocument();
  });
});


