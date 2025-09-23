import React, { useState, useEffect } from 'react';

// TypeScript interface in JSX file
interface UserProps {
  id: number;
  name: string;
  email: string;
  isActive?: boolean;
}

interface UserState {
  loading: boolean;
  error: string | null;
}

// TypeScript component with type annotations
const UserProfile: React.FC<UserProps> = ({ id, name, email, isActive = true }) => {
  const [state, setState] = useState<UserState>({
    loading: false,
    error: null,
  });

  const [userData, setUserData] = useState<UserProps | null>(null);

  useEffect(() => {
    const fetchUser = async (): Promise<void> => {
      setState({ loading: true, error: null });
      
      try {
        const response = await fetch(`/api/users/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        
        const user: UserProps = await response.json();
        setUserData(user);
      } catch (err) {
        setState(prev => ({ 
          ...prev, 
          error: err instanceof Error ? err.message : 'Unknown error' 
        }));
      } finally {
        setState(prev => ({ ...prev, loading: false }));
      }
    };

    fetchUser();
  }, [id]);

  const handleToggleStatus = (): void => {
    if (userData) {
      setUserData({
        ...userData,
        isActive: !userData.isActive,
      });
    }
  };

  if (state.loading) {
    return <div>Loading...</div>;
  }

  if (state.error) {
    return <div>Error: {state.error}</div>;
  }

  return (
    <div className="user-profile">
      <h1>{name}</h1>
      <p>Email: {email}</p>
      <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
      <button onClick={handleToggleStatus}>
        Toggle Status
      </button>
    </div>
  );
};

export default UserProfile;
