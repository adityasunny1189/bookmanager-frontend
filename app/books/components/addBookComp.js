import { Button, DatePicker, Input } from "antd";
import TextArea from "antd/es/input/TextArea";

export default function AddBookComp({ title, setTitle, description, setDescription, publishedDate, setPublishedDate, onSave }) {
    return (
        <div>
            <h1 className=" text-2xl font-bold text-center">Add Book</h1>
            <div className=" w-full flex flex-row justify-between my-5">
                <div htmlFor="title">Title</div>
                <div>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} type="text" id="title" name="title" />
                </div>
            </div>
            <div className="w-full flex flex-row justify-between my-5"> 
                <label htmlFor="description">Description</label>
                <div>
                    <TextArea value={description} onChange={(e) => setDescription(e.target.value)} className=" text" id="description" name="description" />
                </div>
            </div>
            <div className="w-full flex flex-row justify-between my-5">
                <label htmlFor="publishedDate">Published Date</label>
                <div>
                    <DatePicker value={publishedDate} onCalendarChange={(e) => setPublishedDate(e)} id="publishedDate" name="publishedDate" />
                </div>
            </div>
            <div className=" w-full text-center my-10">
                <Button onClick={onSave} type="primary">Add Book</Button>
            </div>
        </div>
    );
}
