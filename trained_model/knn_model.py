from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import pandas as pd
import joblib

df = pd.read_csv('278k_song_labelled.csv')
new_df = df.drop(df.columns[0], axis=1)

#Features and labels
X = df[['duration (ms)', 'danceability', 'energy', 'loudness', 'speechiness',
       'acousticness', 'instrumentalness', 'liveness', 'valence', 'tempo',
       'spec_rate']]
y = df['labels']

# Normalize
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.3)

# Initialize KNN and train
k = 5
knn = KNeighborsClassifier(n_neighbors=k)
knn.fit(X_train, y_train)

# Evaluate
score = knn.score(X_test, y_test)
print(f'Model Accuracy: {score}')

# Export model
joblib.dump(knn, 'knn_model.pkl')
joblib.dump(scaler, 'scaler.pkl')