import { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs, setDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

export function useFirestore<T>(collectionName: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      let q;
      
      // Koleksiyona göre sıralama kriterini belirle
      switch (collectionName) {
        case 'siparisler':
          q = query(collection(db, collectionName), orderBy('date', 'desc'));
          break;
        case 'destek_talepleri':
          // Tarih alanı olan koleksiyonlar için tarih sıralaması
          q = query(collection(db, collectionName), orderBy('date', 'desc'));
          break;
        case 'urunler':
          // Ürünler için isim sıralaması
          q = query(collection(db, collectionName), orderBy('name', 'asc'));
          break;
        case 'kategoriler':
          // Kategoriler için isim sıralaması
          q = query(collection(db, collectionName), orderBy('name', 'asc'));
          break;
        default:
          q = query(collection(db, collectionName));
      }

      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as T[];
      setData(items);
      setError(null);
    } catch (err) {
      setError('Veriler yüklenirken bir hata oluştu');
      console.error('Firestore error:', err);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (item: Omit<T, 'id'>, id?: string) => {
    try {
      const docRef = doc(db, collectionName, id || doc(collection(db, collectionName)).id);
      await setDoc(docRef, {
        ...item,
        ...(collectionName === 'siparisler' || collectionName === 'destek_talepleri' 
          ? { date: new Date().toISOString() } 
          : {})
      });
      await fetchData();
      return docRef.id;
    } catch (err) {
      setError('Öğe eklenirken bir hata oluştu');
      throw err;
    }
  };

  const updateItem = async (id: string, item: Partial<T>) => {
    try {
      await updateDoc(doc(db, collectionName, id), item);
      await fetchData();
    } catch (err) {
      setError('Öğe güncellenirken bir hata oluştu');
      throw err;
    }
  };

  const deleteItem = async (id: string) => {
    try {
      await deleteDoc(doc(db, collectionName, id));
      await fetchData();
    } catch (err) {
      setError('Öğe silinirken bir hata oluştu');
      throw err;
    }
  };

  useEffect(() => {
    fetchData();
  }, [collectionName]);

  return { data, loading, error, addItem, updateItem, deleteItem, refreshData: fetchData };
}