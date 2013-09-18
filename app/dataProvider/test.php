<?php
error_reporting(E_ALL);

class Task {

protected $pid;
protected $ppid;

function __construct(){
}

function fork(){
$pid = pcntl_fork();
if ($pid == -1)
throw new Exception ('fork error on Task object');
elseif ($pid) {
# we are in parent class
$this->pid = $pid;
# echo "< in parent with pid {$his->pid}\n";
} else{
# we are is child
$this->run();
}
}

function run(){
# echo "> in child {$this->pid}\n";
# sleep(rand(1,3));
$this->ppid = posix_getppid();
$this->pid = posix_getpid();
}

# call when a task in finished (in parent)
function finish(){
echo "task finished {$this->pid}\n";
}

function pid(){
return $this->pid;
}
}

class SleepingTask extends Task{
function run(){
parent::run();
echo "> in child {$this->pid}\n";

# print_r($this);

sleep(rand(1,5));
echo "> child done {$this->pid}\n";
exit(0);
}
}

class TaskManager{

protected $pool;

function __construct(){
$this->pool = array();
}

function add_task($task){
$this->pool[] = $task;
}

function run(){

foreach($this->pool as $task){
$task->fork();
}

# print_r($this);
# sleep(60);

while(1){
echo "waiting\n";
$pid = pcntl_wait($extra);
if($pid == -1)
break;

echo ": task done : $pid\n";
$this->finish_task($pid);
}

echo "processes done ; exiting\n";
exit(0);
}

function finish_task($pid){
if($task = $this->pid_to_task($pid))
$task->finish();
}

function pid_to_task($pid){
foreach($this->pool as $task){
if($task->pid() == $pid)
return $task;
}
return false;
}
}

$manager = new TaskManager();

for($i=0 ; $i<10 ; $i++)
$manager->add_task(new SleepingTask());

$manager->run();