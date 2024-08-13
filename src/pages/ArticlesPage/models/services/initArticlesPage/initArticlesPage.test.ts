import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { initArticlesPage } from './initArticlesPage';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { articlesPageActions } from '../../slices/articlesPageSlice';
import { ArticleSortField, ArticleType } from '@/entities/Article';

jest.mock('../fetchArticlesList/fetchArticlesList');

describe('initArticlesPage', () => {
  test("doesn't work with inited state", async () => {
    const thunk = new TestAsyncThunk(initArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 9,
        isLoading: false,
        hasMore: true,
        _inited: false,
        type: ArticleType.ALL,
      },
    });
    const searchParams = new URLSearchParams(
      'order=asc&sort=title&search=example&type=ECONOMICS',
    );

    await thunk.callThunk(searchParams);

    expect(thunk.dispatch).toHaveBeenCalledTimes(8);
    expect(thunk.dispatch).toHaveBeenCalledWith(
      articlesPageActions.setOrder('asc'),
    );
    expect(thunk.dispatch).toHaveBeenCalledWith(
      articlesPageActions.setSort(ArticleSortField.TITLE),
    );
    expect(thunk.dispatch).toHaveBeenCalledWith(
      articlesPageActions.setSearch('example'),
    );
    expect(thunk.dispatch).toHaveBeenCalledWith(
      articlesPageActions.setType(ArticleType.ECONOMICS),
    );
    expect(thunk.dispatch).toHaveBeenCalledWith(
      articlesPageActions.initState(),
    );
    expect(fetchArticlesList).toHaveBeenCalledWith({});
  });

  test('2 times', async () => {
    const thunk = new TestAsyncThunk(initArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 9,
        isLoading: false,
        hasMore: false,
        _inited: true,
        type: ArticleType.ALL,
      },
    });
    const searchParams = new URLSearchParams(
      'order=asc&sort=date&search=example',
    );

    await thunk.callThunk(searchParams);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(fetchArticlesList).not.toHaveBeenCalledWith();
  });
});
