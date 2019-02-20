var b2Vec2 = Box2D.Commom.Math.b2Vec2;
var b2BodyDef = Box2D.Dynamics.b2BodyDef;
var b2Body = Box2D.Dynamics.b2Body;
var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
var b2Fixture = Box2D.Dynamics.b2Fixture;
var b2World = Box2D.Dynamics.b2World;
var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
var b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;

var world;
//在canvas上的30像素表示Box2d世界中的一米
var scale = 30;
function init(){
    //创建Box2d world对象，该对象将完成大部分物理计算
    var gravity = new b2Vec2(0,9.8);//声明重力加速度为9.8m/s^2,方向向下
    var allowSleep = true;//允许静止的物体进入休眠状态，休眠物体不参与物理仿真计算
    world = new b2World(gravity,allowSleep);
}