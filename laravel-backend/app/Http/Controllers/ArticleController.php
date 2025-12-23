<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ArticleController extends Controller
{
    /**
     * Display a listing of the articles.
     */
    public function index(): JsonResponse
    {
        $articles = Article::orderBy('created_at', 'desc')->get();
        return response()->json([
            'success' => true,
            'data' => $articles
        ]);
    }

    /**
     * Store a newly created article in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'url' => 'nullable|string',
            'author' => 'nullable|string|max:255',
            'published_date' => 'nullable|date',
            'references' => 'nullable|string',
            'is_updated' => 'nullable|boolean'
        ]);

        $article = Article::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Article created successfully',
            'data' => $article
        ], 201);
    }

    /**
     * Display the specified article.
     */
    public function show(string $id): JsonResponse
    {
        $article = Article::find($id);

        if (!$article) {
            return response()->json([
                'success' => false,
                'message' => 'Article not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $article
        ]);
    }

    /**
     * Update the specified article in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $article = Article::find($id);

        if (!$article) {
            return response()->json([
                'success' => false,
                'message' => 'Article not found'
            ], 404);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'content' => 'sometimes|string',
            'url' => 'nullable|string',
            'author' => 'nullable|string|max:255',
            'published_date' => 'nullable|date',
            'references' => 'nullable|string',
            'is_updated' => 'nullable|boolean'
        ]);

        $article->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Article updated successfully',
            'data' => $article
        ]);
    }

    /**
     * Remove the specified article from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $article = Article::find($id);

        if (!$article) {
            return response()->json([
                'success' => false,
                'message' => 'Article not found'
            ], 404);
        }

        $article->delete();

        return response()->json([
            'success' => true,
            'message' => 'Article deleted successfully'
        ]);
    }

    /**
     * Get the latest article.
     */
    public function latest(): JsonResponse
    {
        $article = Article::orderBy('created_at', 'desc')->first();

        if (!$article) {
            return response()->json([
                'success' => false,
                'message' => 'No articles found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $article
        ]);
    }
}
