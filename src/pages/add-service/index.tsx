import TextEditor from "@/components/text-editor";
import "./index.less";


export default function SearchPage() {
    return (
        <div className="search-container">
            <TextEditor />
        </div>
    );
}
SearchPage.route = {
    // [MENU_PATH]: "/list/text-editor",
    [MENU_PATH]: "/list/card",
};
