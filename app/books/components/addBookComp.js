import { Button, DatePicker, Input, Card, Typography, Form } from "antd";
import TextArea from "antd/es/input/TextArea";

const { Title } = Typography;

export default function AddBookComp({ title, setTitle, description, setDescription, publishedDate, setPublishedDate, onSave }) {
    return (
        <Card className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
            <Title level={2} className="text-center">Add Book</Title>
            
            <Form layout="vertical" className="space-y-4 mt-5">
                <Form.Item label="Title" required>
                    <Input 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="Enter the book title"
                    />
                </Form.Item>
                
                <Form.Item label="Description" required>
                    <TextArea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        rows={4} 
                        placeholder="Enter a brief description of the book"
                    />
                </Form.Item>
                
                <Form.Item label="Published Date" required>
                    <DatePicker 
                        value={publishedDate} 
                        onChange={(date) => setPublishedDate(date)} 
                        style={{ width: '100%' }} 
                    />
                </Form.Item>
                
                <div className="text-center mt-8">
                    <Button onClick={onSave} type="primary" size="large">
                        Add Book
                    </Button>
                </div>
            </Form>
        </Card>
    );
}
