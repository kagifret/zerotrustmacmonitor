import psutil #the library gets system metrics

def get_system_metrics(): #returns the system metrics as a dictionary
    return {
        "cpu": psutil.cpu_percent(interval=1),
        "memory": psutil.virtual_memory().percent,
        "disk": psutil.disk_usage("/").percent,
        "network": psutil.net_io_counters(),
        "process_count": len(psutil.pids())
    }
