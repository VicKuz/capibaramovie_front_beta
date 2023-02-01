import numpy as np
from sklearn.model_selection import KFold
from sklearn.metrics import mean_squared_error
from sklearn.metrics import mean_absolute_error
from lenskit.algorithms import Recommender
from lenskit.algorithms.user_knn import UserUser
from sklearn.metrics import precision_recall_fscore_support

def kfold_evaluation(X):
    kf = KFold(n_splits=5, shuffle=True)

    y_test_labels = list()
    y_pred_labels = list()
    y_test = list()
    y_pred = list()

    for x_train_id, x_test_id in kf.split(X):
        user_user = UserUser(15, min_nbrs=3)
        recsys = Recommender.adapt(user_user)
        recsys.fit(X.iloc[x_train_id])

        test_df = X.iloc[x_test_id]
        test_df['predicted_rating'] = recsys.predict(X.iloc[x_test_id])

        test_df = test_df.dropna(axis=0)

        test_df['relevant'] = test_df['rating'].apply(lambda x: 1 if x > 3 else 0)
        test_df['predicted_relevant'] = test_df['predicted_rating'].apply(lambda x: 1 if x > 3 else 0)

        if len(y_test) == 0:
            y_test = list(test_df['rating'])
            y_pred = list(test_df['predicted_rating'])
            y_test_labels = list(test_df['relevant'])
            y_pred_labels = list(test_df['predicted_relevant'])
        else:
            y_test = np.append(y_test, list(test_df['rating']))
            y_pred = np.append(y_pred, list(test_df['predicted_rating']))
            y_test_labels = np.append(y_test_labels, list(test_df['relevant']))
            y_pred_labels = np.append(y_pred_labels, list(test_df['predicted_relevant']))

    precision, recall, fscore, _ = precision_recall_fscore_support(y_test_labels, y_pred_labels, average="binary")
    mae = mean_absolute_error(y_test, y_pred)
    mse = mean_squared_error(y_test, y_pred)

    result = ("Precision:\t" + str(precision) +
              "\nRecall:\t" + str(recall) +
              "\nFscore:\t" + str(fscore) +
              "\nMAE:\t" + str(mae) +
              "\nMSE:\t" + str(mse))
    return result