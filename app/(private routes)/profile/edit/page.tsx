'use client';
import Image from 'next/image';
import css from './EditProfilePage.module.css';
import { useEffect, useState } from 'react';
import { getMe, updateMe } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

// import { useAuthStore } from '@/lib/store/authStore';

const EditProfile = () => {
  const router = useRouter();
  //   const { user } = useAuthStore();
  //   const email = user?.email;
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  useEffect(() => {
    getMe().then(user => {
      setUserName(user.username ?? '');
      setEmail(user.email ?? '');
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      await updateMe({ username: userName });
      router.push('/profile');
    } catch (error) {
      toast.error(` happened error :${error}`);
    }

    console.log({ userName });
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <Image
          src={'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form onSubmit={handleSaveUser} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              onChange={handleChange}
              id="username"
              type="text"
              className={css.input}
              value={userName}
            />
          </div>

          <p>Email: {email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              onClick={() => router.push('/profile')}
              type="button"
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </main>
  );
};

export default EditProfile;
