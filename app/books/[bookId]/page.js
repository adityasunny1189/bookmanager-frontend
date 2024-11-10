'use client';

import { useQuery, gql, useMutation } from "@apollo/client";
import { Button, Card, Divider, Form, Input, List, Rate, Typography, Select, Spin, message } from "antd";
import { useState } from "react";

const { Title, Text } = Typography;
const { Option } = Select;

const GET_BOOK_BY_ID = gql`
    query GetBookById($getBookByIdId: ID!) {
        getBookById(id: $getBookByIdId) {
            description
            id
            publishedDate
            title
            authors {
                biography
                bornDate
                id
                name
            }
            reviewsAndRating {
                id
                rating
                review
                userId
            }
        }
    }
`;

const GET_ALL_AUTHORS = gql`
    query GetAuthors {
        getAuthors {
            authors {
                biography
                name
                id
            }
        }
    }
`;

const ADD_AUTHOR_TO_BOOK = gql`
    mutation AddAuthorToBook($bookId: ID!, $authorId: ID!) {
        addAuthorToBook(bookId: $bookId, authorId: $authorId) {
            title
            authors {
                name
            }
        }
    }
`;

const ADD_REVIEW_AND_RATING = gql`
mutation AddReviewAndRatingToBook($bookId: ID!, $userId: ID!, $review: String!, $rating: Int!) {
  addReviewAndRatingToBook(bookId: $bookId, userId: $userId, review: $review, rating: $rating) {
    title
    id
    reviewsAndRating {
      bookId
      rating
      review
      userId
      id
    }
  }
}
`;

export default function BookInfo({ params }) {
    const bookId = params.bookId;
    const [form] = Form.useForm();
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [selectedReviewer, setSelectedReviewer] = useState(null);
    const [selectedAuthor, setSelectedAuthor] = useState(null);
    const [review, setReview] = useState('');

    const { loading: loadingBook, error: errorBook, data: dataBook, refetch: refetchBook } = useQuery(GET_BOOK_BY_ID, {
        variables: { getBookByIdId: bookId }
    });
    
    const { loading: loadingAuthors, error: errorAuthors, data: dataAuthors } = useQuery(GET_ALL_AUTHORS);
    const [addAuthorToBook] = useMutation(ADD_AUTHOR_TO_BOOK);
    const [addReviewAndRatingToBook] = useMutation(ADD_REVIEW_AND_RATING);

    if (loadingBook || loadingAuthors) return <Spin />;
    if (errorBook) return `Error loading book! ${errorBook.message}`;
    if (errorAuthors) return `Error loading authors! ${errorAuthors.message}`;

    const handleAddReview = async () => {
        try {
            await addReviewAndRatingToBook({ variables: { bookId, userId: selectedReviewer, review, rating } });
            message.success("Review added successfully!");
            form.resetFields();
            setSelectedReviewer(null);
            setRating(0);
            setReview('');
            refetchBook(); // Refetch book data to show the new review
        } catch (error) {
            message.error("Failed to add review.");
            console.error(error);
        }
    };

    const handleAddAuthor = async () => {
        try {
            await addAuthorToBook({ variables: { bookId, authorId: selectedAuthor } });
            message.success("Author added successfully!");
            setSelectedAuthor(null);
            refetchBook(); 
        } catch (err) {
            message.error("Failed to add author.");
            console.error(err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <Card className="mb-6">
                <Title level={2}>{dataBook.getBookById.title}</Title>
                <Text>{dataBook.getBookById.description}</Text>
                <Divider />
                <Title level={4}>Authors</Title>
                <List
                    dataSource={dataBook.getBookById.authors}
                    renderItem={(author) => (
                        <List.Item key={author.id}>
                            <Text>{author.name}</Text>
                        </List.Item>
                    )}
                />
                <div className="flex items-center mt-4 space-x-2">
                    <Select
                        placeholder="Select author to add"
                        onChange={(value) => setSelectedAuthor(value)}
                        style={{ width: 200 }}
                    >
                        {dataAuthors.getAuthors.authors.map((author) => (
                            <Option key={author.id} value={author.id}>
                                {author.name}
                            </Option>
                        ))}
                    </Select>
                    <Button type="primary" onClick={handleAddAuthor} disabled={!selectedAuthor}>
                        Add Author
                    </Button>
                </div>
            </Card>

            <Card className="mb-6">
                <Title level={4}>Reviews and Ratings</Title>
                <List
                    dataSource={[...dataBook.getBookById.reviewsAndRating, ...reviews]}
                    renderItem={(review) => (
                        <List.Item key={review.id}>
                            <Text>{review.review} - <Rate disabled value={review.rating} /></Text>
                        </List.Item>
                    )}
                />
            </Card>

            <Card>
                <Title level={4}>Add a Review</Title>
                <Form form={form} layout="vertical" className="space-y-4">
                    <Form.Item
                        label="Review"
                        name="review"
                        rules={[{ required: true, message: 'Please enter your review' }]}
                    >
                        <Input.TextArea value={review} onChange={(e) => setReview(e.target.value)} rows={4} placeholder="Write your review..." />
                    </Form.Item>
                    <Form.Item label="Rating">
                        <Rate value={rating} onChange={(value) => setRating(value)} />
                    </Form.Item>
                    <Form.Item
                        label="Reviewer"
                        name="reviewer"
                        rules={[{ required: true, message: 'Please select a reviewer' }]}
                    >
                        <Select
                            placeholder="Select reviewer"
                            onChange={(value) => setSelectedReviewer(value)}
                        >
                            {dataAuthors.getAuthors.authors.map((author) => (
                                <Option key={author.id} value={author.id}>
                                    {author.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Button type="primary" onClick={handleAddReview}>
                        Submit Review
                    </Button>
                </Form>
            </Card>
        </div>
    );
}
