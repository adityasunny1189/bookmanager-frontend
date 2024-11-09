import { Card, Avatar } from "antd"
import Meta from "antd/es/card/Meta";
import {
    EditOutlined,
    DeleteFilled,
    InfoCircleFilled,
} from '@ant-design/icons';


export const Book = ({book, deleteBook, editBook, openBook}) => {
    return (
        <Card
            actions={[
                <InfoCircleFilled 
                    key="setting" 
                    onClick={() => openBook(book)}
                />,
                <EditOutlined 
                    key="edit" 
                    onClick={() => editBook(book)}
                />,
                <DeleteFilled 
                    key="setting" 
                    onClick={() => deleteBook(book)}
                />,
            ]}
        >
            <Meta
                avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                title={book.title}
                description={book.description}
            />
        </Card>
    )
}
