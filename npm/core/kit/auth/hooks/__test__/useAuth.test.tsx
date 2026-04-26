import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useAuth } from '../useAuth';

const mockDecode = vi.fn();

const { mockSignIn, mockSignOut, mockUseSession, mockUsePathname } = vi.hoisted(() => ({
  mockSignIn: vi.fn(),
  mockSignOut: vi.fn(),
  mockUseSession: vi.fn(),
  mockUsePathname: vi.fn(),
}));

// We mock these BEFORE importing useAuth
vi.mock('next-auth/react', () => ({
  signIn: mockSignIn,
  signOut: mockSignOut,
  useSession: mockUseSession,
}));

vi.mock('next/navigation', () => ({
  usePathname: mockUsePathname,
}));

vi.mock('@/swiss/auth/Jwts', () => ({
  Jwts: vi.fn().mockImplementation(function (this: any) {
    this.decode = mockDecode;
  }),
}));
describe('useAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseSession.mockReturnValue({ data: null, status: 'unauthenticated' });
    mockUsePathname.mockReturnValue('/');
  });
  it('login calls signIn with keycloak', () => {
    mockUsePathname.mockReturnValue('/current-path');
    const { result } = renderHook(() => useAuth());
    result.current.login();
    expect(mockSignIn).toHaveBeenCalledWith('keycloak', {
      callbackUrl: '/current-path',
      redirect: true,
    });
  });
  it('logout calls signOut with SIGNIN_PATH', () => {
    const { result } = renderHook(() => useAuth());
    result.current.logout();
    expect(mockSignOut).toHaveBeenCalledWith({
      callbackUrl: '/auth/signin',
      redirect: true,
    });
  });
  it('getIdentity returns null when no session', () => {
    mockUseSession.mockReturnValue({ data: null, status: 'unauthenticated' });
    const { result } = renderHook(() => useAuth());
    expect(result.current.getIdentity()).toBeNull();
  });
  it('getIdentity returns identity when session exists', () => {
    const mockSession = {
      user: { name: 'John Doe', email: 'john@example.com' },
      accessToken: 'mock-token',
    };
    const mockDecoded = {
      preferred_username: 'johndoe',
      given_name: 'John',
      family_name: 'Doe',
    };
    mockUseSession.mockReturnValue({ data: mockSession, status: 'authenticated' });
    mockDecode.mockReturnValue(mockDecoded);
    const { result } = renderHook(() => useAuth());
    const identity = result.current.getIdentity();
    expect(identity).toEqual({
      name: 'John Doe',
      email: 'john@example.com',
      preferred_username: 'johndoe',
      given_name: 'John',
      family_name: 'Doe',
    });
  });
  it('getInitials returns initials from given and family name', () => {
    const mockSession = {
      user: { name: 'John Doe' },
      accessToken: 'mock-token',
    };
    const mockDecoded = {
      given_name: 'John',
      family_name: 'Doe',
    };
    mockUseSession.mockReturnValue({ data: mockSession, status: 'authenticated' });
    mockDecode.mockReturnValue(mockDecoded);
    const { result } = renderHook(() => useAuth());
    expect(result.current.getInitials()).toBe('JD');
  });
  it('getInitials returns initials from name when given/family name missing', () => {
    const mockSession = {
      user: { name: 'Jane Smith' },
      accessToken: 'mock-token',
    };
    mockUseSession.mockReturnValue({ data: mockSession, status: 'authenticated' });
    mockDecode.mockReturnValue({}); // No given_name, family_name
    const { result } = renderHook(() => useAuth());
    expect(result.current.getInitials()).toBe('JS');
  });
  it('getInitials returns empty string when no identity', () => {
    mockUseSession.mockReturnValue({ data: null, status: 'unauthenticated' });
    const { result } = renderHook(() => useAuth());
    expect(result.current.getInitials()).toBe('');
  });
});
