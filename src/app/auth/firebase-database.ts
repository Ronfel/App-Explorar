import { getApp, getApps, initializeApp } from 'firebase/app';
import { getDatabase, type DataSnapshot, type Database } from 'firebase/database';
import { firebaseConfig } from './firebase.config';

export function getRealtimeDatabase(): Database {
  const databaseURL = firebaseConfig.databaseURL.trim();
  if (!databaseURL) {
    throw new Error('Configure a URL do Realtime Database em firebase.config.ts.');
  }

  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  return getDatabase(app, databaseURL);
}

export function snapshotToArray<T extends object>(snapshot: DataSnapshot): Array<T & { id: string }> {
  const records = snapshot.val() as Record<string, T | null> | null;

  return Object.entries(records ?? {}).flatMap(([id, record]) =>
    record === null ? [] : [{ ...record, id }]
  );
}
