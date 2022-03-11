import Icon from "../Nav/Icon"
import './FloorHeader.scss'
export default (props) => { // topic, color
    return (<>
    <h3 class="col-sm-6">{props.topic.title}</h3>
    <div class="col-sm-6 all-materials">
      <a href={`/topic/${props.topic.slug}`}
        >все материалы
        <Icon name={`arrow-right-${props.color}`} />
      </a>
    </div>
    </>)
}