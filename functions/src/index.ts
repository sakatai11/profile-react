import * as functions from 'firebase-functions';
import { google } from 'googleapis';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const sheetsApp = functions
  .region('asia-northeast1') // リージョンを指定
  .firestore.document('contacts/{docId}')
  .onCreate(
    async (
      snap: functions.firestore.DocumentSnapshot,
      context: functions.EventContext,
    ) => {
      const newValue = snap.data();
      if (!newValue) {
        console.error('No data found in the new document.');
        return;
      }
      console.log('New message added:', newValue);

      try {
        const auth = await google.auth.getClient({
          scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        const sheets = google.sheets({ version: 'v4', auth });

        // タイムスタンプの変換
        const timestamp = newValue.timestamp.toDate(); // FirestoreのタイムスタンプをDateオブジェクトに変換
        if (isNaN(timestamp.getTime())) {
          throw new Error('Invalid timestamp value');
        }
        const japanTime = new Date(timestamp.getTime() + 9 * 60 * 60 * 1000); // 日本時間に変換

        // 既存のデータを取得して1行下に移動
        const getResponse = await sheets.spreadsheets.values.get({
          spreadsheetId: '1zZu7ZYwXT5BLifGrVVcn8nT8iiYWQAQXu0wEcMMPXQY',
          range: 'リスト!B2:F1000',
        });

        const existingValues = getResponse.data.values || [];
        const updatedValues = existingValues.map((row) => row);

        // 新しいデータを追加
        updatedValues.unshift([
          context.params.docId,
          japanTime.toISOString(),
          newValue.name,
          newValue.email,
          newValue.content,
        ]);

        const response = await sheets.spreadsheets.values.update({
          spreadsheetId: '1zZu7ZYwXT5BLifGrVVcn8nT8iiYWQAQXu0wEcMMPXQY',
          range: 'リスト!B2:F' + (updatedValues.length + 1), // 書き込みたいシートと範囲を指定
          valueInputOption: 'RAW',
          requestBody: {
            values: updatedValues,
          },
        });

        console.log('Spreadsheet updated:', response.data);
      } catch (error) {
        console.error('Error updating spreadsheet:', error);
      }
    },
  );
