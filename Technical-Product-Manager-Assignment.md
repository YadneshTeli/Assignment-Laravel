# BeyondChats Technical Product Manager Assignment

## Note 1: About This Role

You have applied for a full-time, remote employment opportunity at BeyondChats.

In this role, you will work closely with our Product and Engineering teams on a Laravel-based backend, ReactJS frontend, and NodeJS-based LLM systems. While you'll have support from other engineers, this role requires a strong understanding of multiple tech stacks and the ability to think independently about system design, trade-offs, and real-world constraints.

To help us evaluate whether this role is a good mutual fit, we've designed the assignment below. It's intended to give us insight into your problem-solving approach, hands-on expertise, and engineering judgment.

You are welcome to use AI tools while working on this assignment. However, we care far more about your thinking and execution than raw AI-generated output. Please avoid copy-pasting unedited AI-generated code. Make sure your submission reflects your own decisions and understanding - supported by AI.

If you have any questions or need clarifications, feel free to reach out to us at support@beyondchats.com. In case you don't hear back from us, please use your judgement to make decisions.

All the best,
Team BeyondChats

---

## Note 2: Time Constraints & Evaluation

This assignment may feel time-consuming. That is intentional.

We expect you to spend **no more than 6 to 8 hours** on it. This may not seem like enough time to build everything perfectly, and that's intentional. You may be applying to many other places as well, and you may not have much time to allocate to this assignment.

We are interested to see how you approach the problem under these constraints:
- How you break it down
- What assumptions you make
- What you choose to prioritise
- What you consciously decide to skip

**Partial completion is completely acceptable.** How you approach the assignment and how you implement it matters more than finishing every requirement.

As you work on this assignment, your problem-solving ability, hands-on expertise, coding style, and comfort with modern tools (including vibe coding) will naturally become evident.

This assignment is not for everyone, and that's okay. We are looking for engineers who enjoy building reliable systems, even when time and motivation are limited.

If that sounds like you, we'd love to see how you work.

Looking forward to reviewing your submission. All the best.

---

## Your Task

Your task is divided into 3 phases.

### Phase 1: Article Scraping & CRUD APIs (Moderate Difficulty)

1. **Scrape articles** from the last page of the blogs section of BeyondChats (fetch the 5 oldest articles)
   - URL: https://beyondchats.com/blogs/

2. **Store articles in a database**

3. **Create CRUD APIs** in a Laravel project for the articles you stored in the database

### Phase 2: Google Search Integration & LLM Enhancement (Very Difficult)

Create a NodeJS-based script/project that:

1. **Fetch** the latest article from the newly created Laravel API

2. **Search** this article's title on Google

3. **Extract** the first two links from Google Search results that are blogs or articles published by other websites

4. **Scrape** the main content from these two articles you found on Google Search

5. **Call an LLM API** to update the original article and make its formatting and content similar to the two new articles that are ranking on top of Google

6. **Publish** the newly generated article using the CRUD APIs created in Phase 1

7. **Cite reference articles** (that you scraped from Google Search results) at the bottom of the newly generated article

### Phase 3: ReactJS Frontend (Very Easy)

Create a small ReactJS-based frontend project that:
- Fetches articles from the Laravel APIs
- Displays them in a responsive, professional UI
- Shows both the original articles and their updated versions

---

## Submission Guidelines

### Evaluation Criteria

We do not expect everything to be perfect. We will evaluate you based on the following criteria:

| Criteria | Weight |
|----------|--------|
| Completeness | 50% |
| ReadMe & Setup Docs | 25% |
| Live Link | 15% |
| Code Quality | 10% |

### Repository Requirements

- **One monolithic git repo** which contains your code for all the various projects (Laravel, NodeJS, ReactJS)

- **ReadMe file** must include:
  - Local setup instructions
  - Data flow diagram / Architecture diagram to quickly get a summary of the entire project
  - A live link for your frontend project where we can check the original article as well as the updated article

- **Public access** - Make sure your git repo is publicly accessible so our team can review your submission

---

## Important Notes

- **Submission Deadline:** Thursday, 25 Dec, 11:59 pm IST
- **Partial work is OK** - Partial completion is completely acceptable
- **Your code is your property** and we promise to not use any part of your submission unless we select you for this employment opportunity

---

## ALL THE BEST!